import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, FormControl, FormHelperText, Input, Stack, Textarea, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/postSlice';
import JoditEditor from 'jodit-react';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './jodit-editor.css';
import { getCategories, reset } from '../../features/categorySlice';
import { Select } from "chakra-react-select";
import { ToastChakra } from '../../helpers/toast';

const CreatePost = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { categories, isError, message } = useSelector((state) => state.categories);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getCategories());

        return () => {
            dispatch(reset())
        }

    }, [navigate, dispatch, user]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1000);
        console.log(message);
    }

    const themeBG = useColorModeValue('default', 'dark');
    const bg = useColorModeValue('white', 'gray.900');

    const editor = useRef(null);
    const [cargando, setCargando] = useState(false);

    const config = {
        theme: themeBG,
        language: 'es',
        toolbar: true,
        toolbarSticky: true,
        placeholder: '',
        editor: {
            maxHeight: '100%',
            width: '100%',
            color: useColorModeValue('black', 'white')
        },
        readonly: false,
        toolbarButtonSize: 'md',
        statusbar: true,
        break: true,
        style: {
            height: '100%',
            width: '100%',
            color: useColorModeValue('black', 'white')
        },

        toolbarAdaptive: true,

        // uploader: {
        //     insertImageAsBase64URI: false,
        //     IntersectionObserverEntry: true,
        // },

        // upload image 
    }

    const initialValues = {
        title: '',
        description: '',
        category: '',
        image: '',
        tags: [],
    }

    const [indice, setIndice] = useState(initialValues);

    const handleSave = () => {
        setCargando(true);
        dispatch(createPost(indice)).then(() => {
            setIndice(initialValues);
            setCargando(false);
            navigate('/home');
        }).catch(err => {
            console.error(err);
        })
    }

    const tags = [
        "javascript",
        "java",
        "tutoriales",
        "webdev",
        "python",
        "programming"
    ];

    const ChakraStyle = {
        control: (provided) => ({
            ...provided,
            bg: "none",
            cursor: "inherit",
            border: "none",
            boxShadow: "none",
            fontWeight: 'semibold',
            _hover: {
                bg: "none",
                border: "none",
                boxShadow: "none",
                fontWeight: 'semibold',
            },
        }),
        option: (provided) => ({
            ...provided,
            bg: bg,
            cursor: "pointer",
            borderRadius: "xs",
            fontWeight: 'semibold',
            _hover:{ 
                bg: '#7928ca29',
                borderWidth: '1px',
                color: '#7928ca',
                borderColor: '#7928ca',
                fontWeight: 'semibold',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            bg: '#7928ca29',
            borderColor: '#7928ca',
            color: '#7928ca',
            borderWidth: "1px",
            fontWeight: 'semibold',
        }),
        placeholder: (provided) => ({
            ...provided,
            bg: "none",
            cursor: "inherit"
        }),
    }

    return (
        <>
            <Container
                maxW="5xl"
                mt={24}
                mb={10}
            >
                <Box
                    p={10}
                    borderRadius="lg"
                    _dark={{ borderWidth: '1px', borderColor: 'purple.800' }}
                    boxShadow="base"
                    overflow="hidden"
                    bg={useColorModeValue('white', 'primary.900')}
                    mt={4}
                >
                    <Stack direction={'column'} spacing={2}>
                        <Input
                            type="text"
                            placeholder="Image URL"
                            value={indice?.image}
                            onChange={(e) => setIndice({ ...indice, image: e.target.value })}
                        />

                        {/* <Input 
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => handleSaveImage(e.target.files[0])}
                        /> */}

                        <Textarea
                            type="text"
                            placeholder="New post title here..."
                            size={'lg'}
                            fontSize={'3xl'}
                            rows={undefined}
                            fontWeight={'black'}
                            fontFamily={'heading'}
                            variant='unstyled'
                            value={indice?.title}
                            onChange={(e) => setIndice({ ...indice, title: e.target.value })}
                        />

                        <Stack direction={{ base: 'column', lg: 'column' }} spacing={2}>
                            <FormControl id="category">
                                <Select
                                    placeholder="Select tags"
                                    options={
                                        tags.map((tag) => (
                                            { 
                                                label: `#${tag}`,
                                                value: tag
                                            }
                                        ))
                                    }
                                    colorScheme="purple"
                                    className="chakra-react-select"
                                    classNamePrefix="chakra-react-select"
                                    variant="unstyled"
                                    chakraStyles={ChakraStyle}
                                    value={indice?.tags}
                                    onChange={(e) => setIndice({ ...indice, tags: e })}
                                    isOptionDisabled={() => indice?.tags?.length >= 4}
                                    size="sm"
                                    isMulti
                                    isSearchable
                                    isClearable
                                />
                                {
                                    indice?.tags?.length >= 4 && (
                                        <FormHelperText color="red.500" fontSize="sm">
                                            You can only select 4 tags
                                        </FormHelperText>
                                    )
                                }
                            </FormControl>

                            <Select
                                selectedOptionColor="purple"
                                placeholder="Select a category"
                                options={
                                    categories?.data?.map((category) => {
                                        return {
                                            label: category.title,
                                            value: category._id,
                                        }
                                    })
                                }
                                onChange={(e) => setIndice({ ...indice, category: e.value })}
                                focusBorderColor='purple.500'
                                selectedOptionStyle='purple.500'
                                colorScheme="purple"
                                className="chakra-react-select"
                                classNamePrefix="chakra-react-select"
                                variant="oultine"
                                size="sm"
                                isClearable
                                isRequired
                                isSearchable
                            />
                        </Stack>

                        <Stack direction={'column'} bg={'black'}>
                            <JoditEditor
                                ref={editor}
                                value={indice?.description}
                                config={config}
                                tabIndex={'20px'}
                                rows={10}
                                onBlur={newContent => setIndice({ ...indice, description: newContent })}
                            />
                        </Stack>
                    </Stack>
                    <Box display={'flex'} mt={2} w={'full'} justifyContent={'flex-end'} alignItems={'center'}>
                        <Button
                            colorScheme={'purple'}
                            onClick={handleSave}
                            rightIcon={<FiCheckCircle size={20} />}
                            loadingText='Guardando...'
                            spinnerPlacement='start'
                            size="lg"
                            _dark={{
                                bg: 'purple.500',
                                color: 'white',
                                _hover: {
                                    bg: 'purple.600',
                                    color: 'white',
                                },
                            }}
                            isLoading={cargando ? true : false}
                            isDisabled={!indice?.title || !indice.description || !indice.image || !indice.category ? true : false}
                        >
                            Publish
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default CreatePost;
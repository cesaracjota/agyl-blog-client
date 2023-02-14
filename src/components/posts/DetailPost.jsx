import React, { useEffect, useState } from 'react'
import {
    Avatar, Box, Container,
    Divider, Heading, IconButton,
    Image, Stack, Tag,
    Textarea, useColorModeValue,
    Button, Text, Card, CardBody,
    ModalOverlay, Modal, ModalContent,
    ModalHeader, ModalCloseButton, ModalBody, Flex, GridItem, Grid, CardHeader,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { getPost, reset } from '../../features/postSlice';
import { SpinnerComponent } from '../../helpers/spinner';
import parse from 'html-react-parser';
import { BsChevronBarExpand } from 'react-icons/bs';
import { RiHeart2Line, RiSendPlaneLine } from 'react-icons/ri';
import { FaRegComment } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { createComment } from '../../features/commentSlice';
import { getUser } from '../../features/userSlice';

import Moment from 'moment';

const DetailPost = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { post, isLoading, isError, message } = useSelector((state) => state.posts);

    const [user_detail, setUserDetail] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const params = useLocation(location);

    const bg = useColorModeValue('white', 'primary.900');
    const borderColor = useColorModeValue('gray.200', 'primary.700');
    const bgTransparency = useColorModeValue('rgba(0, 0, 0, .07)', 'rgba(255, 255, 255, .1)');

    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        if(user){
            dispatch(getUser(user?.data?._id)).then((res)=> {
                setUserDetail(res.payload);
            })
        }

        dispatch(getPost(params?.state?.id));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, params?.state?.id, user?.data?._id]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1000);
        console.log(message);
    }

    const initialValues = {
        post: '',
        description: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const handlePublish = () => {
        if (!user) {
            setIsModalOpen(true);
        } else {
            setCargando(true);
            let data = {
                post: post?._id,
                description: indice.description
            }
            dispatch(createComment(data)).then(() => {
                setIndice(initialValues);
                setCargando(false);
                dispatch(getPost(params?.state?.id));
            }).catch(err => {
                console.error(err);
            })
        }
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const lightenDarkenColor = (colorCode, amount) => {

        let usePound = false;

        if (colorCode[0] === "#") {
            colorCode = colorCode.slice(1);
            usePound = true;
        }
        const num = parseInt(colorCode, 16);
        let r = (num >> 16) + amount;

        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        let b = ((num >> 8) & 0x00FF) + amount;

        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        let g = (num & 0x0000FF) + amount;

        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        let color = (g | (b << 8) | (r << 16)).toString(16);
        while (color.length < 6) {
            color = 0 + color;
        }
        return (usePound ? '#' : '') + color;
    }

    const bgColorModified = lightenDarkenColor(`${post?.author?.brand_color}`, - 100);

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (

        <Container
            maxW="8xl"
            px={{ base: 4, lg: 0 }}
            mb={10}
            minH={'100vh'}
        >
            <Grid
                mt={20}
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(12, 1fr)'
                gap={2}
            >
                <GridItem
                    colSpan={{ base: 0, lg: 1 }}
                    display={{ base: 'none', lg: 'block' }}
                    direction='column'
                >
                    <Stack direction={'column'} spacing={8}>
                        <IconButton icon={<RiHeart2Line size={20} />} variant={'ghost'} size={'sm'} colorScheme={'gray'} />
                        <IconButton icon={<FaRegComment size={20} />} variant={'ghost'} size={'sm'} colorScheme={'gray'} />
                    </Stack>
                </GridItem>

                { /** MAIN DETAIL PAGE */}

                <GridItem colSpan={{ base: 12, lg: 8 }}>
                    <Container
                        maxW="4xl"
                        mb={10}
                        minH={'100vh'}
                    >
                        <Stack direction="row">
                            <Box w="full">
                                <Image
                                    src={post?.image}
                                    alt={post?.title}
                                    width={'full'}
                                    maxH={'350px'}
                                    objectFit='cover'
                                    borderTopRadius={'md'}
                                    // fallbackSrc='https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5rqMjOZkz0xYuq5EW9iUVW/4b9d294957436a9683afbca7aea4df23/tctd2-wony-skyscraper-fallback-bg.jpg'
                                />
                                <Box py={6} px={10} textAlign={'start'} bg={bg}>
                                    <Stack spacing={4} direction={'row'} mb={2}>
                                        <Link
                                            to={{
                                                pathname: `/a/${post?.author?.username && post?.author?.username?.replace(/ /g, '-')}/`,
                                            }}
                                            state={{ id: post?.author?._id }}
                                        >
                                            <Avatar
                                                borderWidth={'3px'}
                                                borderColor={bgTransparency}
                                                size={'md'}
                                                name={post?.author?.name}
                                                src={post?.author?.image}
                                            />
                                        </Link>
                                        <Stack spacing={0} direction="column" alignSelf={'center'}>
                                            <Link
                                                to={{
                                                    pathname: `/a/${post?.author?.name && post?.author?.name?.replace(/ /g, '-')}/`,
                                                }}
                                                state={{ id: post?.author?._id }}
                                            >
                                                <Text
                                                    size='sm'
                                                    _hover={{ color: 'purple.300' }}
                                                    cursor={'pointer'}
                                                    fontWeight={'bold'}
                                                >
                                                    {post?.author?.name}
                                                </Text>
                                            </Link>
                                            <Text fontSize={'sm'}>{Moment(post?.createdAt).format('[Posted on ➡️] MMM DD (hh:ss) A')}</Text>
                                        </Stack>
                                    </Stack>
                                    <Heading textAlign={'start'} as={'h1'} fontSize={{ base: '3xl', lg: '5xl' }} fontWeight={'extrabold'}>{post?.title}</Heading>
                                    <Divider my={4} />
                                    {
                                        post?.tags?.map((tag, index) => (
                                            <Link to={`/t/${tag?.value}`} key={index}>
                                                <Tag size='lg' _hover={{ bg: '#7928ca29', borderWidth: '1px', color: '#7928ca', borderColor: '#7928ca' }} mt={2} mr={2} py={2}>
                                                    {tag?.label}
                                                </Tag>
                                            </Link>
                                        ))
                                    }
                                </Box>
                                <Divider my={1} />
                                <Box py={6} px={{ base: 6, lg: 10 }} bg={bg} fontSize={'xl'} boxShadow={'base'}>
                                    {parse(`${post?.description}`)}
                                </Box>

                                <Divider />

                                {/** ADD COMMENTS */}

                                <Box py={6} px={{ base: 6, lg: 10 }} bg={bg} fontSize={'lg'} borderBottomRadius={'md'} boxShadow={'base'}>
                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                        <Heading alignSelf="center" size={{ base: 'md', lg: 'lg' }}>Top Comments({post?.comments?.length})</Heading>
                                        <IconButton colorScheme={'purple'} size={{ base: 'xs', lg: 'md' }} variant="outline" icon={<BsChevronBarExpand size={18} />} />
                                    </Stack>
                                    <Stack direction={'row'} justifyContent={'stretch'} mt={4}>
                                        <Avatar src={user_detail?.image} size={{ base: 'xs', lg: 'sm' }} />
                                        <Textarea
                                            id="comment"
                                            size={{ base: 'xs', lg: 'md' }}
                                            variant='unstyled'
                                            placeholder='Add to the discussion...'
                                            onChange={(e) => setIndice({ ...indice, description: e.target.value })}
                                        />
                                        <Modal
                                            isCentered
                                            isOpen={isModalOpen}
                                            onClose={handleModalClose}
                                            size={{ base: 'sm', lg: '2xl' }}
                                        >
                                            <ModalOverlay
                                                bg="rgba(0,0,0,0.7)"
                                                backdropFilter='auto'
                                                backdropBlur='4px'
                                            />
                                            <ModalContent
                                                _dark={{
                                                    bg: "primary.900"
                                                }}
                                            >
                                                <ModalHeader alignSelf="baseline" as={Heading} size={'lg'}>Log in to continue</ModalHeader>
                                                <Divider />
                                                <ModalCloseButton alignSelf="baseline" mt={1} />
                                                <ModalBody>

                                                    <Image
                                                        src={'https://ph-files.imgix.net/4456b7ea-3f94-4bbb-8d03-0b55a6ebff0f.gif?auto=format'}
                                                        maxW={20}
                                                        transform={'rotate(-20deg)'}
                                                        py={6}
                                                        textAlign="center"
                                                    />

                                                    <Text py={4}>We're a place where coders share, stay up-to-date and grow their careers.</Text>

                                                    <Stack direction="column" spacing={2} mt={4} mb={4}>
                                                        <Link as={NavLink} to={'/login'}>
                                                            <Button w='full' colorScheme="purple" _dark={{ bg: 'purple.500', color: 'white', _hover: { bg: 'purple.700'}}}>Login</Button>
                                                        </Link>
                                                        <Link as={NavLink} to={'/new-user'}>
                                                            <Button w='full' variant="outline" colorScheme="purple"  _dark={{ color: 'purple.600' }}>Create Account</Button>
                                                        </Link>
                                                    </Stack>
                                                </ModalBody>
                                            </ModalContent>
                                        </Modal>
                                    </Stack>
                                    <Stack direction={'row'} justifyContent={'flex-end'} mt={2}>
                                        <Button
                                            size={{ base: 'sm', lg: 'md' }}
                                            colorScheme={'purple'}
                                            _dark={{ bg: 'purple.600', color: 'white', _hover: { bg: 'purple.700'}}}
                                            leftIcon={<RiSendPlaneLine />}
                                            onClick={handlePublish}
                                            isDisabled={!indice.description}
                                            loadingText='Adding your comment...'
                                            spinnerPlacement='start'
                                            isLoading={cargando ? true : false}
                                        >
                                            Comentar
                                        </Button>
                                    </Stack>
                                    <Divider my={8} />

                                    { /** COMMENTS */}

                                    <Stack direction={'column'} justifyContent={'stretch'} spacing={4} mt={4}>
                                        {
                                            post?.comments.map((comment, index) => (
                                                <Stack spacing={1} direction={'column'} key={index} w={'full'}>
                                                    <Stack spacing={2} direction={'row'}>
                                                        <Link
                                                            to={{
                                                                pathname: `/a/${comment?.user?.username && comment?.user?.username?.replace(/ /g, '-')}/`,
                                                            }}
                                                            state={{ id: comment?.user?._id }}
                                                        >
                                                            <Avatar
                                                                borderWidth={'1px'}
                                                                size={'sm'}
                                                                name={comment?.user?.name}
                                                                src={comment?.user?.image}
                                                                mt={'12.5px'}
                                                            />
                                                        </Link>
                                                        <Card w={'full'} bg={bg} borderWidth={1} borderColor={borderColor} boxShadow={'none'}>
                                                            <CardBody px={3} py={4}>
                                                                <Stack direction='column' spacing={1}>
                                                                    <Stack spacing={1} direction="row" justifyContent={'space-between'}>
                                                                        <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
                                                                            <Link
                                                                                to={{
                                                                                    pathname: `/a/${comment?.user?.username && comment?.user?.username?.replace(/ /g, '-')}/`,
                                                                                }}
                                                                                state={{ id: comment?.user?._id }}
                                                                            >
                                                                                <Text
                                                                                    fontSize={'sm'}
                                                                                    _hover={{ color: 'purple.400' }}
                                                                                    cursor={'pointer'}
                                                                                    fontFamily={'unset'}
                                                                                    fontWeight={'bold'}
                                                                                >
                                                                                    {comment?.user?.name}
                                                                                    <span style={{ color: '#7928ca' }}>  •</span>
                                                                                </Text>
                                                                            </Link>
                                                                            <Text alignSelf={'center'} fontSize={'x-small'}>{Moment(comment?.createdAt).format("MMM DD")}</Text>
                                                                        </Stack>
                                                                        <IconButton alignSelf={'center'} textAlign={'end'} size={'xs'} variant={'ghost'} aria-label="Delete comment" icon={<FiMoreVertical size={14} />} />
                                                                    </Stack>
                                                                    <Text fontSize={{ base: 'small', lg: 'md' }}>
                                                                        {comment?.description}
                                                                    </Text>
                                                                </Stack>
                                                            </CardBody>
                                                        </Card>
                                                    </Stack>
                                                    <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
                                                        <Button leftIcon={<RiHeart2Line size={20} />} alignSelf="center" variant={'outline'} size={{ base: 'xs', lg: 'sm' }} _hover={{ bg: '#7928ca29', borderWidth: '1px', color: '#7928ca', borderColor: '#7928ca' }}>
                                                            Like
                                                        </Button>
                                                        <Button leftIcon={<FaRegComment size={18} />} alignSelf="center" variant={'outline'} size={{ base: 'xs', lg: 'sm' }} _hover={{ bg: '#7928ca29', borderWidth: '1px', color: '#7928ca', borderColor: '#7928ca' }}>
                                                            reply
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            ))
                                        }
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                    </Container>
                </GridItem>

                { /** RIGHT SIDE - MORE ABOUT THE USER */}

                <GridItem
                    colSpan={{ base: 0, lg: 3 }}
                    display={{ base: 'none', lg: 'block' }}
                >
                    <Stack direction="column" spacing={4}>

                        <Flex
                            shadow="base"
                            rounded="lg"
                            bg="white"
                            _dark={{
                                bg: "primary.900",
                            }}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box
                                height="100%"
                                width="100%"
                                borderTopRadius="lg"
                                bg={bgColorModified}
                                h={10}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                            </Box>
                                <Image
                                    src={post?.author?.image}
                                    alt="Profile Picture"
                                    borderRadius="full"
                                    boxSize="50px"
                                    shadow="base"
                                    border="2px solid"
                                    // alignSelf="center"
                                    // mb={"-36px"}
                                    borderColor={bgTransparency}
                                    mt={-7}
                                />
                            <Box
                                px={4}
                                mb={4}
                                width="full"
                                height="full"
                                borderRadius="lg"
                                textAlign="center"
                            >
                                <Heading
                                    fontSize="xl"
                                    fontWeight="bold"
                                >
                                    {post?.author?.name}
                                </Heading>
                                <Button bg="#7928CA" color="white" _hover={{ bg: "#4B0082" }} variant="solid" mt={4} w="full">
                                    Follow
                                </Button>
                                <Text mt={4} textAlign="justify">
                                    { post?.author?.summary }
                                </Text>
                            </Box>
                        </Flex>

                        <Card bg={bg}>
                            <CardHeader bg={bg} borderRadius="xl">
                                <Heading size='md'>More from <span style={{ color: '#7928CA' }}>{post?.author?.username}</span></Heading>
                            </CardHeader>
                            {
                                post?.author?.posts?.length > 0 ? (
                                    post?.author?.posts?.map((post_item, index) => (
                                        <div key={index}>
                                            <Divider my={1} />
                                            <CardBody bg={bg} borderRadius="xl">
                                                <Stack spacing='4'>
                                                    <Box>
                                                        <Link
                                                            to={{
                                                                pathname: `/p/${post?.author?.username && post?.author?.username?.replace(/ /g, '-')}/${post?.title && post?.title.replace(/ /g, '-')}`,
                                                            }}
                                                            state={{ id: post?._id }}
                                                        >
                                                            <Heading pr={{ base: 0, lg: 10 }} size={'sm'} textAlign={{ base: 'center', lg: 'justify' }} cursor={'pointer'} _hover={{ color: "purple.600" }}>
                                                                {post_item?.title}
                                                            </Heading>
                                                        </Link>
                                                        {
                                                            post_item?.tags?.map((tag, index) => (
                                                                <Link to={`/t/${tag?.label}`} key={index}>
                                                                    <Tag size='sm' _hover={{ bg: '#7928ca29', borderWidth: '1px', color: '#7928ca', borderColor: '#7928ca' }} mt={2} mr={2} py={1}>
                                                                        {tag?.value}
                                                                    </Tag>
                                                                </Link>
                                                            ))
                                                        }
                                                    </Box>
                                                </Stack>
                                            </CardBody>
                                        </div>
                                    )).slice(post?.author?.posts.length - 5)
                                ) : null
                            }
                        </Card>
                    </Stack>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default DetailPost;
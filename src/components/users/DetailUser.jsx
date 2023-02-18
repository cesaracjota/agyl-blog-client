import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Box,
    Container,
    HStack,
    Heading,
    Button,
    IconButton,
    Stack,
    Text,
    useColorModeValue,
    Tag,
    Icon,
    CardBody,
    Card,
    Divider,
    Link as ChakraLink,
    Flex,
    Spacer
} from '@chakra-ui/react';
import { FiLink, FiUserPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RiArticleFill, RiChat1Fill } from 'react-icons/ri';
import { FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import Moment from 'moment';
import { getUser, reset } from '../../features/userSlice';
import { SpinnerComponent } from '../../helpers/spinner';
import { ToastChakra } from '../../helpers/toast';
import { lightenDarkenColor } from '../../helpers/settingColor';

const DetailUser = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, message } = useSelector((state) => state.users);
    const bg = useColorModeValue('white', 'primary.900');

    const [user_detail, setUserDetail] = useState([]);

    const params = useParams(location);

    useEffect(() => {

        dispatch(getUser(params?.username)).then((user) =>{
            setUserDetail(user.payload);
        })

        return () => {
            dispatch(reset());
        }

    }, [navigate, dispatch, params?.username]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    if (isLoading) {
        return <SpinnerComponent />
    }

    const bgColorModified = lightenDarkenColor(`${user_detail?.brand_color}`, - 60);

    return (
        <>
            <Box
                h={'11.5rem'}
                bg={bgColorModified}
            />
            <Container
                maxW="5xl"
                px={{ base: '32px', lg: 0 }}
            >
                <Box
                    borderRadius="md"
                    _dark={{
                        borderColor: 'primary.900',
                        borderWidth: 1,
                    }}
                    boxShadow="base"
                    bg={bg}
                    mt={-14}
                >
                    <Stack spacing={4} direction="column" justifyContent="center" alignItems={'center'} p={4}>
                        <Avatar
                            size="2xl"
                            name={user_detail?.name}
                            src={user_detail?.image}
                            borderColor={bgColorModified}
                            mt={-20}
                            mb={-16}
                            borderWidth={9}
                        />
                        <HStack display={{ base: 'none', lg: 'flex '}} spacing={4} direction="row" w="full" justifyContent="end" alignItems={'end'} p={4}>
                            <Button
                                colorScheme="purple" 
                                _dark={{ bg: 'purple.500', color: 'white', _hover: { bg: 'purple.600' } }}
                                fontWeight={'extrabold'}
                                size={'sm'}
                                alignSelf={'end'}
                                rightIcon={<FiUserPlus />}
                            >
                                Follow
                            </Button>
                            <IconButton icon={<FiMoreHorizontal />} size="sm" colorScheme="gray" />
                        </HStack>
                        <Stack spacing={4} direction="column" justifyContent="center" alignItems={'center'}>
                            <IconButton
                                colorScheme="purple" 
                                display={{ base: 'flex', lg: 'none '}}
                                _dark={{ bg: 'purple.500', color: 'white', _hover: { bg: 'purple.600' } }}
                                fontWeight={'extrabold'}
                                size={'sm'}
                                alignSelf={'end'}
                                icon={<FiUserPlus />}
                            >
                                Follow
                            </IconButton>
                            <Heading fontSize="3xl" fontWeight="black">{user_detail?.name}</Heading>
                            <Text fontSize="md" textAlign={'center'}>
                                {user_detail?.summary}
                            </Text>
                            <Stack direction={{base: "column", lg: "row"}} spacing={6} justifyContent="center" alignItems={'center'} alignSelf={'center'} p={4}>
                                <Stack direction="row" spacing={1} alignSelf={'center'}>
                                    <Icon as={FaMapMarkerAlt} fontSize={20}/>
                                    <Text fontSize="sm">{user_detail?.location}</Text>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Icon as={FaBirthdayCake} fontSize={20}/>
                                    <Text fontSize="sm">{Moment(user_detail?.createdAt).format('[Joined on ➡️] DD MMM YYYY')}</Text>
                                </Stack>
                                <Stack direction="row" spacing={1} _hover={{ color: 'purple.600', textDecoration: true}}>
                                    <Icon as={FiLink} fontSize={20}/>
                                    <ChakraLink href={user_detail?.website} target={'_blank'}>
                                        <Text fontSize="sm">{user_detail?.website}</Text>
                                    </ChakraLink>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Flex w="full" px={{base: 2, lg: 20}}>
                            <Stack direction="column" spacing={1} textAlign="center" w="full">
                                <Text fontSize="sm" color="gray.500">Education</Text>
                                <Text>{user_detail?.education}</Text>
                            </Stack>
                            <Spacer />
                            <Stack direction="column" spacing={1} textAlign="center" w="full">
                                <Text fontSize="sm" color="gray.500">Work</Text>
                                <Text>{user_detail?.work}</Text>
                            </Stack>
                        </Flex>
                    </Stack>
                </Box>

                <Stack
                    mt={4}
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={4}
                    display={'flex'}
                    w={'full'}
                >
                    <Box
                        bg={bg}
                        w={{ base: 'full', lg: '300px' }}
                        borderRadius="md"
                        boxShadow={'base'}
                        _dark={{
                            borderColor: 'primary.900',
                            borderWidth: 1,
                            color: 'white',
                        }}
                        maxH={'100px'}
                    >
                        <Stack spacing={4} direction="column" p={4}>
                            <HStack spacing={4} direction="row" justifyContent="flex-start" alignItems={'center'}>
                                <Icon as={RiArticleFill} w={6} h={6} color={'purple.600'} />
                                <Text fontSize="sm">{user_detail?.posts?.length} posts published</Text>
                            </HStack>
                            <HStack spacing={4} direction="row" justifyContent="flex-start" alignItems={'center'}>
                                <Icon as={RiChat1Fill} w={6} h={6} color={'purple.600'} />
                                <Text fontSize="sm">{user_detail?.comments?.length} comments written </Text>
                            </HStack>
                        </Stack>
                    </Box>

                    <Box
                        w={'full'}
                        flex={1}
                    >
                        <Stack spacing={4} direction="column">
                            {
                                user_detail?.posts?.map((post, index) => (
                                    <Card
                                        bg={bg}
                                        borderRadius="md"
                                        boxShadow={'base'}
                                        _dark={{
                                            borderColor: 'primary.900',
                                            borderWidth: 1,
                                        }}
                                        key={index}
                                    >
                                        <CardBody>
                                            <Stack
                                                direction={'row'}
                                                spacing={2}
                                                justifyContent={'stretch'}
                                                py={2}
                                                alignSelf={'center'}
                                            >
                                                <Avatar
                                                    borderWidth={'1px'}
                                                    size={'sm'}
                                                    name={user_detail?.name}
                                                    src={user_detail?.image}
                                                    alignSelf={'start'}
                                                    mt='5px'
                                                />
                                                <Stack spacing={3} textAlign={'start'}>
                                                    <Stack spacing={0} direction="column" textAlign='start'>
                                                        <Text
                                                            fontSize='sm'
                                                            fontWeight='bold'
                                                            cursor={'pointer'}
                                                        >
                                                            {user_detail?.name}
                                                        </Text>
                                                        <Text textAlign={'start'} mb={4} fontSize={'xs'}>{Moment(post?.createdAt).format('MMMM DD (hh:ss) A')}</Text>
                                                    </Stack>

                                                    <Link
                                                        to={{
                                                            pathname: `/p/${user_detail?.username}/${post?.slug}`,
                                                        }}
                                                    >
                                                        <Heading pr={{ base: 0, lg: 10 }} size={{ base: 'sm', lg: 'md' }} textAlign={{ base: 'justify', lg: 'justify' }} cursor={'pointer'} _hover={{ color: "purple.600" }}>
                                                            {post?.title}
                                                        </Heading>
                                                    </Link>

                                                    <Text fontSize={'sm'} textAlign={{ base: 'start', lg: 'justify' }} mt='4'>
                                                        {
                                                            post?.tags?.map((tag, index) => (
                                                                <Link to={`/t/${tag?.value}`} key={index}>
                                                                    <Tag size={'sm'} variant="subtle" mb={1} _hover={{ bg: '#7928ca29', borderWidth: '1px', color: '#7928ca', borderColor: '#7928ca' }} py={1} mr={2}>
                                                                        {tag?.label}
                                                                    </Tag>
                                                                </Link>
                                                            ))
                                                        }
                                                    </Text>
                                                </Stack>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                        </Stack>
                    </Box>
                </Stack>
                &nbsp;
            </Container>
        </>
    )
}

export default DetailUser;
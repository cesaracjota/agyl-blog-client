import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spinner,
    Stack,
    Text,
    Icon,
    useDisclosure,
    useColorModeValue,
    Link,
    FormHelperText
} from '@chakra-ui/react';
import Topnav from '../../components/layout/top-nav';
import Footer from '../../components/layout/footer';
import { FaGithub, FaGoogle, FaRegUser, FaTwitter } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { register, reset } from '../../features/authSlice';
import { FiLock, FiMail } from 'react-icons/fi';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignupPage = () => {

    const sidebar = useDisclosure();
    const bgAuth = useColorModeValue('gray.50', 'primary.900');

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { ROLE, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if (isError) {
            ToastChakra('Error', message, 'error', 1500, 'top-right');
        }

        dispatch(reset());

    }, [dispatch, isError, isSuccess, message, navigate, ROLE]);

    const handleRegister = (e) => {
        e.preventDefault();
        const userData = {
            name,
            username,
            email,
            password,
        };
        dispatch(register(userData));
    };

    const correoUsuario = window.localStorage.getItem('usuario_correo');

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const content = (isLoading) ? (
        <Center h={'100vh'} w={'full'} bg={'primary.1000'}>
            <Stack spacing={4} px={4} direction="column" align={'center'}>
                <Text fontSize="2xl" fontWeight="bold">
                    {' '}
                    Iniciando Sesión ...{' '}
                </Text>
                <Spinner
                    size={200}
                    type="ball-spin-fade-loader"
                    color="#805ad5"
                />
            </Stack>
        </Center>
    ) : (
        <form onSubmit={handleRegister}>
            <Box as="section" bg="gray.50" _dark={{ bg: "#121212" }} minH="100vh" overflow="hidden">
                <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />
                <Container
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                    minH={'100vh'}
                >
                    <Stack mt={16} spacing="6" boxShadow={'base'} borderRadius="md" bg={bgAuth} minW={{ base: 'md', lg: 'lg' }} py={8}>
                        <Stack spacing="4">
                            <Stack textAlign="center">
                                <Heading size={'md'}>
                                    Wellcome to Agyl Blog
                                </Heading>
                            </Stack>
                        </Stack>
                        <Box px={{ base: '0', sm: '10' }}>
                            <Stack>
                                <Stack spacing={2}>
                                    <Button size={'sm'} colorScheme={'twitter'} _dark={{ bg: 'twitter.600', color: 'white', _hover: { bg: 'twitter.700'}}} leftIcon={<FaTwitter size={16} />}>Twitter</Button>
                                    <Button size={'sm'} colorScheme={'blue'} _dark={{ bg: 'blue.600', color: 'white', _hover: { bg: 'blue.700'}}} leftIcon={<FaGoogle size={16} />}>Google</Button>
                                    <Button size={'sm'} colorScheme={'gray'} leftIcon={<FaGithub size={16} />}>Github</Button>
                                </Stack>
                                <Stack spacing={1}>
                                    <FormControl isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.500"
                                                _dark={{ color: 'gray.400' }}
                                                children={<FaRegUser color="gray.500" fontSize={18} />}
                                            />
                                            <Input
                                                type="text"
                                                value={name}
                                                placeholder='Add your name'
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </InputGroup>
                                        {
                                            name.length > 25 ? (
                                                <FormHelperText color="red.500">
                                                    The name must be less than 25 characters
                                                </FormHelperText>
                                            ) : null
                                        }
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.500"
                                                _dark={{ color: 'gray.400' }}
                                                children={<FaRegUser color="gray.500" fontSize={18} />}
                                            />
                                            <Input
                                                type="text"
                                                value={username}
                                                placeholder='Add your username'
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </InputGroup>
                                        {
                                            username.length > 20 ? (
                                                <FormHelperText color="red.500">
                                                    The username must be less than 20 characters
                                                </FormHelperText>
                                            ) : null
                                        }
                                    </FormControl>
                                    <Divider />
                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.500"
                                                _dark={{ color: 'gray.400' }}
                                                children={<FiMail color="gray.500" fontSize={18} />}
                                            />
                                            <Input
                                                type="email"
                                                value={correoUsuario ? correoUsuario : email}
                                                placeholder='Add your email'
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.500"
                                                _dark={{ color: 'gray.400' }}
                                                children={<FiLock color="gray.500" fontSize={20} />}
                                            />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder='Add your password'
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <InputRightElement width="3rem">
                                                <Button h="1.75rem" color={'white'} bg="messenger.600" _hover={{ bg: 'messenger.700' }} size="sm" onClick={handleShowClick} >
                                                    {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                                <Stack spacing="6">
                                    <Button
                                        colorScheme={'purple'}
                                        _dark={{ bg: 'purple.600', color: 'white', _hover: { bg: 'purple.700'}}}
                                        mt={2}
                                        type="submit"
                                    >Continue</Button>
                                    <HStack>
                                        <Divider />
                                        <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                            Already have an account?  <Link as={NavLink} to={'/login'} textColor={'purple.500'}>Log in.</Link>
                                        </Text>
                                        <Divider />
                                    </HStack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
                <Footer />
            </Box>
        </form>
    );

    return content;

}

export default SignupPage;
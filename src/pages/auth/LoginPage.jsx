import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
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
  useColorModeValue
} from '@chakra-ui/react';
import Topnav from '../../components/layout/top-nav';
import Footer from '../../components/layout/footer';
import { FaGithub, FaGoogle, FaRegUser, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { login, reset } from '../../features/authSlice';
import { FiLock } from 'react-icons/fi';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginPage = () => {

  const sidebar = useDisclosure();
  const bgAuth = useColorModeValue('gray.50', 'primary.900');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const { ROLE, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (isError) {
      ToastChakra('Error', message, 'error', 1500, 'top-right');
    }

    dispatch(reset());

  }, [dispatch, isError, isSuccess, message, navigate, ROLE]);

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    if (checked === true) {
      window.localStorage.setItem('usuario_correo', userData.correo);
    } else {
      window.localStorage.removeItem('usuario_correo');
    }
    dispatch(login(userData));
  };

  const correoUsuario = window.localStorage.getItem('usuario_correo');

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const content = (isLoading) ? (
    <Center h={'100vh'} w={'full'} bg={'primary.900'}>
      <Stack spacing={4} px={4} direction="column" align={'center'}>
        <Text fontSize="xl" fontWeight="bold">
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
    <form onSubmit={handleLogin}>
      <Box as="section" bg="gray.50" _dark={{ bg: "#121212" }} minH="100vh" overflow="hidden">
        <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />
        <Container
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
          minH={'100vh'}
        >
          <Stack mt={{ base: 4, lg: 16 }} spacing="6" boxShadow={'base'} borderRadius="md" bg={bgAuth} minW={{ base: 'sm', lg: 'lg' }} px={{ base: 2, lg: 0 }} py={{ base: 10, lg: 8 }}>
            <Stack spacing="4">
              <Stack textAlign="center">
                <Heading size={'md'}>
                  Log in to your account
                </Heading>
              </Stack>
            </Stack>
            <Box px={{ base: 4, lg: 10 }}>
              <Stack>
                <Stack spacing={2}>
                  <Button size={'sm'} colorScheme={'twitter'} _dark={{ bg: 'twitter.600', color: 'white', _hover: { bg: 'twitter.700'}}} leftIcon={<FaTwitter size={16} />}>Twitter</Button>
                  <Button size={'sm'} colorScheme={'blue'} _dark={{ bg: 'blue.600', color: 'white', _hover: { bg: 'blue.700'}}} leftIcon={<FaGoogle size={16} />}>Google</Button>
                  <Button size={'sm'} colorScheme={'gray'} leftIcon={<FaGithub size={16} />}>Github</Button>
                </Stack>
                <Stack>
                  <FormControl isRequired>
                    <FormLabel mt={4}>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.500"
                        _dark={{ color: 'gray.400' }}
                        children={<FaRegUser color="gray.500" fontSize={18} />}
                      />
                      <Input
                        type="email"
                        value={correoUsuario ? correoUsuario : email}
                        placeholder='Ingrese su correo'
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
                        placeholder='Ingrese su contraseña'
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
                <HStack justify="space-between">
                  <Checkbox
                    defaultChecked={!correoUsuario ? false : true}
                    value={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    isDisabled={correoUsuario ? true : false}
                  >
                    Remember me
                  </Checkbox>
                  <Button variant="link" colorScheme="blue" _dark={{ color: 'blue.600', _hover: { color: 'blue.700'}}} size="sm">
                    Forgot password?
                  </Button>
                </HStack>
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
                      Continue with your email address
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

export default LoginPage
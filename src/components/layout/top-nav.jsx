import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormLabel,
    HStack,
    Heading,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { FiEdit2, FiLogOut } from 'react-icons/fi'
import { RiMenu4Fill } from 'react-icons/ri';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../../theme/ColorModeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/authSlice';
import { AddIcon, EmailIcon, SearchIcon } from '@chakra-ui/icons';
import SidebarContent from './Sidebar';
import { getUser } from '../../features/userSlice';

const Topnav = (props) => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const [user_detail, setUserDetail] = useState([]);

    
    useEffect(() => {
        
        if (user) {
            dispatch(getUser(user?.data?.username)).then((res) => {
                setUserDetail(res?.payload)
            })
        }
        
        return () => {
            dispatch(reset())
        }

    }, [dispatch, user]);

    return (
        <>
            <Box>
                <Flex
                    as="header"
                    pos={{ base: "fixed", md: "fixed" }}
                    zIndex="2"
                    top="0"
                    align="space-between"
                    px={8}
                    w="full"
                    py={2}
                    bg="white"
                    _dark={{ bg: "#1e1e1e", boxShadow: "0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)" }}
                    boxShadow="base"
                >
                    <Drawer
                        isOpen={props.isOpen}
                        onClose={props.onClose}
                        placement="left"
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <SidebarContent w="full" borderRight="none" />
                        </DrawerContent>
                    </Drawer>
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "flex", lg: "none" }}
                        onClick={props.onOpen}
                        fontSize="xl"
                        variant="outline"
                        icon={<RiMenu4Fill />}
                        size="md"
                    />
                    <Flex alignSelf="center" verticalAlign={'center'} justify={'flex-end'} justifyContent={{ base: "flex-end", lg: "space-between" }} w={'full'} display="inline-flex">
                        <HStack display={{ base: "none", lg: "flex" }} spacing={4}>
                            <Link to={'/'}>
                                <Image src={'https://ph-files.imgix.net/4456b7ea-3f94-4bbb-8d03-0b55a6ebff0f.gif?auto=format'} cursor={'pointer'} alignSelf={'baseline'} display={{ base: 'none', lg: 'block' }} alt="logo" w="40px" background={useColorModeValue('white', 'primary.900')} />
                            </Link>
                            <InputGroup w="full" display={{ base: 'none', lg: 'block' }} >
                                <Input type="search" placeholder="Search" minW={'xl'} />
                                <InputRightElement>
                                    <IconButton
                                        aria-label="Search"
                                        variant="ghost"
                                        colorScheme={'purple'}
                                        icon={<SearchIcon />}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </HStack>
                        <HStack>
                            {
                                user ? (
                                    <>
                                        <Link as={NavLink} to={'/new-post'}>
                                            <Button
                                                variant="outline"
                                                colorScheme="purple"
                                                _dark={{ color: 'purple.600' }}
                                                mr={0}
                                                leftIcon={<AddIcon />}
                                                display={{ base: 'none', lg: 'flex' }}
                                            >
                                                Create Post
                                            </Button>
                                        </Link>
                                        <ColorModeSwitcher />
                                        <DrawerExample user={user_detail} />
                                    </>
                                ) : (
                                    <HStack spacing="2">
                                        <Link as={NavLink} to={'/login'}>
                                            <Button 
                                                variant="ghost" 
                                                colorScheme="purple"
                                                _dark={{ bg: 'purple.600', color: 'white', _hover: { bg: 'purple.700'}}}
                                            >Login</Button>
                                        </Link>
                                        <Link as={NavLink} to={'/new-user'}>
                                            <Button 
                                                variant="outline" 
                                                colorScheme="purple"
                                                _dark={{ color: 'purple.600' }}
                                            >Create Account</Button>
                                        </Link>
                                    </HStack>
                                )
                            }
                        </HStack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Topnav;

function DrawerExample({ user }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const bgTransparency = useColorModeValue('rgba(0, 0, 0, .07)', 'rgba(255, 255, 255, .1)');

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

    const bgColorModified = lightenDarkenColor(`${user?.brand_color}`, - 70);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <>
            <Image
                src={user?.image}
                alt="avatar"
                onClick={onOpen}
                objectFit='cover'
                border="3px solid"
                borderColor={bgTransparency}
                w="10"
                h="10"
                rounded="full"
                cursor={'pointer'}
                fallbackSrc='https://res.cloudinary.com/di6kiwkwf/image/upload/v1674930919/agyl-blog/users/Profile_avatar_placeholder_large_huadod.jpg'
            />

            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
                size={'sm'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton size={'lg'} mt={1} />
                    <DrawerHeader borderBottomWidth='1px' _dark={{ bg: 'primary.900' }}>
                        My Account
                    </DrawerHeader>
                    <DrawerBody _dark={{ bg: 'primary.900' }}>
                        <Box bgColor={user?.brand_color ? bgColorModified : bgTransparency} h="160px" mx={-6} />
                        <Stack direction={'row'} align={'start'} justifyContent={'space-between'}>
                            <Avatar
                                src={user?.image}
                                name={user?.name}
                                size={'xl'}
                                mt={-14}
                                fontWeight={'extrabold'}
                                borderWidth={6}
                                borderColor={bgTransparency}
                            />
                        </Stack>
                        <Stack mt={4} spacing={6} alignSelf={'center'}>
                            <Stack spacing={2} direction="row" justifyContent={'space-between'}>
                                <Link as={NavLink}
                                    to={{
                                        pathname: `/a/${user?.username}/`,
                                    }}
                                    state={{ id: user?._id }}
                                >
                                    <Box
                                        _hover={{
                                            color: '#7928ca',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        <Heading fontSize='2xl' fontWeight='bold' textTransform={'capitalize'}>{user?.name}</Heading>
                                        <Text fontSize='md'>{user?.email}</Text>
                                    </Box>
                                </Link>
                                <Box alignSelf={'center'}>
                                    <Tooltip label="Settings" aria-label="Settings" alignSelf={'center'}>
                                        <Link as={Link} to={'/profile/settings/profile'}>
                                            <IconButton aria-label="Settings" alignSelf={'center'} colorScheme="purple" _dark={{ bg: 'purple.600', color: 'white' }} icon={<FiEdit2 size={26} />} size={'lg'}/>
                                        </Link>
                                    </Tooltip>
                                </Box>
                            </Stack>

                            <Box>
                                <FormLabel htmlFor='theme'>Defaul Theme</FormLabel>
                                <Select id='theme' defaultValue='light'>
                                    <option value='dark'>Dark</option>
                                    <option value='light'>Light</option>
                                </Select>
                            </Box>

                            <Box>
                                <Heading fontSize='xl' fontWeight='bold'>Support</Heading>
                                <Text fontSize='md' color='gray.500' >Found an issue, have a question or just want to chat?</Text>
                            </Box>

                            <Stack direction={{ base: 'column', lg: 'row' }} spacing={4} justifyContent={'space-between'} w={'full'}>
                                <Button variant='outline' colorScheme='gray' leftIcon={<FaDiscord />}>
                                    Discord
                                </Button>
                                <Button variant='outline' colorScheme='gray' leftIcon={<FaGithub />}>
                                    Github
                                </Button>
                                <Button variant='outline' colorScheme='gray' leftIcon={<EmailIcon />}>
                                    Email
                                </Button>
                            </Stack>

                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px' _dark={{ bg: 'primary.900' }}>
                        <Button rightIcon={<FiLogOut />} size={'lg'} colorScheme='gray' variant={'outline'} onClick={handleLogout}>
                            Sign out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
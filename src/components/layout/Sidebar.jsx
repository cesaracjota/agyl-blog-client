import React from 'react'
import {
    Box,
    Button,
    Flex,
    Icon,
    Link,
    useColorModeValue,
} from '@chakra-ui/react'

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiContactsLine, RiHome5Fill } from 'react-icons/ri';
import { FaHeart, FaList, FaPodcast, FaQq, FaTags, FaVideoSlash } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { MdDashboard } from 'react-icons/md';

export const NavItem = (props) => {

    const activeLinkcolor = useColorModeValue("purple.600", "white");
    const bgActiveLinkColor = useColorModeValue("#3b49df1a", "#a5b4fc");

    const { icon, children, ...rest } = props;

    return (
        <Flex
            align="center"
            py="10px"
            cursor="pointer"
            _hover={{
                bg: bgActiveLinkColor,
                color: activeLinkcolor,
            }}
            role="group"
            fontWeight="semibold"
            borderRadius={{ base: "sm", md: "md" }}
            transition=".5s ease"
            scrollMarginY={10}
            {...rest}
        >
            {icon && (
                <Icon
                    mx="2"
                    ml={{ base: "4", lg: "4" }}
                    fontSize="xl"
                    _groupHover={{
                        color: activeLinkcolor,
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};


const SidebarContent = (props) => {

    const activeLinkcolor = useColorModeValue("purple.500", "white");
    const bgActiveLinkColor = useColorModeValue("#3b49df1a", "#a5b4fc");

    const { ROLE, user } = useSelector(state => state.auth);

    const ADMIN_MENU = [
        {
            name: "Home",
            icon: RiHome5Fill,
            path: "/home",
        },
        {
            name: "Dashboard",
            icon: MdDashboard,
            path: "/listings",
        },
        {
            name: "Sponsors",
            icon: FaHeart,
            path: "/sponsors",
        },
        {
            name: "Contact",
            icon: RiContactsLine,
            path: "/contacts",
        },
    ]

    const USER_MENU = [
        {
            name: "Home",
            icon: RiHome5Fill,
            path: "/home",
        },
        {
            name: "Listings",
            icon: FaList,
            path: "/listings",
        },
        {
            name: "Podcasts",
            icon: FaPodcast,
            path: "/podcasts",
        },
        {
            name: "Videos",
            icon: FaVideoSlash,
            path: "/videos",
        },
        {
            name: "Tags",
            icon: FaTags,
            path: "/tags",
        },
        {
            name: "FAQ",
            icon: FaQq,
            path: "/faq",
        },
    ]

    return (
        <>
            <Box
                as="nav"
                pos="fixed"
                top={{ base: 0, lg: 20 }}
                left={{ base: 0, lg: 2 }}
                zIndex="sticky"
                h="full"
                pb="10"
                overflowX="hidden"
                overflowY="auto"
                borderRadius={{ base: "none", md: "md" }}
                bg={'transparent'}
                // borderWidth={{ base: "0", lg: "1px" }}
                w="240px"
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: useColorModeValue('rgba(0,0,0,.3)', 'rgba(0,0,0,.4)'),
                        borderRadius: '24px',
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'rgba(0,0,0,.5)'
                    },
                    '&::-webkit-scrollbar-thumb:active': {
                        backgroundColor: 'rgba(0,0,0,.6)'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#d4d4d4',
                        borderRadius: '24px',
                    },
                    '&::-webkit-scrollbar-track:hover': {
                        background: '#d4d4d4',
                    },
                    '&::-webkit-scrollbar-track:active': {
                        background: '#d6d6d6',
                    },
                }}
                {...props}
            >
                <Flex
                    direction="column"
                    as="nav"
                    p={2}
                    fontSize="15px"
                    aria-label="Main Navigation"
                >
                    {
                        user ? (
                            <Link as={NavLink} to={'/new-post'}>
                                <Button
                                    variant="outline"
                                    colorScheme="purple"
                                    leftIcon={<AddIcon />}
                                    display={{ base: 'flex', lg: 'none' }}
                                    w={'full'}
                                    mt={4}
                                    mb={4}
                                >
                                    Create Post
                                </Button>
                            </Link>
                        ) : null
                    }
                    {
                        ROLE === 'admin' ? (
                            ADMIN_MENU?.map((item, index) => (
                                <Link
                                    key={index}
                                    mb={2}
                                    as={NavLink}
                                    to={item.path}
                                    _activeLink={{
                                        color: activeLinkcolor,
                                        bg: bgActiveLinkColor,
                                        borderRadius: "md",
                                    }}
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    <NavItem icon={item.icon}>{item.name}</NavItem>
                                </Link>
                            ))
                        ) : (
                            USER_MENU?.map((item, index) => (
                                <Link
                                    key={index}
                                    mb={2}
                                    as={NavLink}
                                    to={item.path}
                                    _activeLink={{
                                        color: activeLinkcolor,
                                        bg: bgActiveLinkColor,
                                        borderRadius: "md",
                                    }}
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    <NavItem icon={item.icon}>{item.name}</NavItem>
                                </Link>
                            ))
                        )
                    }
                </Flex>
            </Box>
        </>
    )
}

export default SidebarContent;
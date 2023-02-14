import React from 'react'
import CreatePost from '../../components/posts/CreatePost'
import Topnav from '../../components/layout/top-nav'
import {
    Box, useDisclosure,
} from '@chakra-ui/react'
import DetailPost from '../../components/posts/DetailPost';

export const CreatePostPage = () => {
    const sidebar = useDisclosure();
    return (
        <>
            <Box as="section" bg="gray.50" _dark={{ bg: "#121212" }} minH="100vh" overflow="hidden">
                <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />
                <CreatePost />
            </Box>
        </>
    )
}

export const DetailPostPage = () => {

    const sidebar = useDisclosure();

    return (
        <>
            <Box as="section" bg="gray.50" _dark={{ bg: "#121212" }}  minH="100vh" overflow="hidden">
                <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />
                <DetailPost />
            </Box>
        </>
    )
}
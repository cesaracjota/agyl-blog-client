import React from 'react'
import DetailUser from '../../components/users/DetailUser'
import { Box, useDisclosure } from '@chakra-ui/react';
import Topnav from '../../components/layout/top-nav';

export const UserDetailPage = () => {
    
    const sidebar = useDisclosure();

    return (
        <>
            <Box as="section" bg="gray.50" _dark={{ bg: "#121212" }} minH="100vh" overflow="hidden">
                <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />
                <DetailUser />
            </Box>
        </>
    )
}
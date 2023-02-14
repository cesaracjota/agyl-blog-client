import { Box, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import Topnav from '../../components/layout/top-nav';
import SettingsProfile from '../../components/profile/SettingsProfile';

export const ProfilePage = () => {

    const sidebar = useDisclosure();

    return (
            <>
                <Box as="section" bg="gray.50" _dark={{ bg: "#121212" }}  minH="100vh" overflow="hidden">
                    <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />
                    <SettingsProfile />
                </Box>
            </>
    )
}
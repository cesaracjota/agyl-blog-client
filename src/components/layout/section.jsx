import React from 'react'
import { Box, Container, useDisclosure } from '@chakra-ui/react'
// import SidebarContent from './Sidebar';
import Topnav from './top-nav';
import SidebarContent from './Sidebar';
import Footer from './footer';

const Section = ({ componente: Component }) => {

    const sidebar = useDisclosure();

    return (
        <Box
            as="section" 
            bg="gray.50"
            _dark={{ bg: "#121212" }}
            minH="100vh"
            overflow="hidden"
        >
            <SidebarContent display={{ base: 'none', lg: 'unset' }} />
            
            <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />

            <Box 
                mt={"89px"} 
                ml={{ base: 0, lg: "240px" }} 
                transition=".1s ease"
            >
                <Container 
                    maxW="container.4xl"
                    mt={4}
                >
                    { Component }
                </Container>
            </Box>
            &nbsp;
            <Footer />
        </Box>
    )
}

export default Section;
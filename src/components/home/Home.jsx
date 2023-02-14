import React, { useEffect } from 'react'
import CardPost from '../posts/CardPost'
import { Box, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import CardListCategories from '../categories/CardListCategories';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { getPosts, reset } from '../../features/postSlice';
import { SpinnerComponent } from '../../helpers/spinner';

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const bg = useColorModeValue('white', 'primary.900');

    const { user } = useSelector((state) => state.auth);

    const { posts, isLoading, isError, message } = useSelector((state) => state.posts);

    useEffect(() => {

        if(user){
            navigate('/home', { replace: true })
        }

        dispatch(getPosts());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    
    if (isError) {
        ToastChakra('Error', message, 'error', 1000);
        console.log(message);
    }

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (
        <>
            <Tabs variant='unstyled'>
                <TabList ml={{ base: 0, lg: 4 }} justifyContent={{ base: "center", lg: "flex-start" }}>
                    <Tab _selected={{ color: 'white', bgGradient: 'linear(to-r, teal.500, green.500)' }} borderRadius={'lg'} fontWeight={'extrabold'}>Relevant</Tab>
                    <Tab _selected={{ color: 'white', bgGradient: 'linear(to-r, #7928CA, #FF0080)' }} borderRadius={'lg'} ml={1} fontWeight={'extrabold'}>Latest</Tab>
                    <Tab _selected={{ color: 'white', bg: "purple.500" }} borderRadius={'lg'} ml={1} fontWeight={'extrabold'}>Top</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel w={'full'}>
                        <Stack
                            mt={4}
                            direction={{ base: 'column', lg: 'row' }}
                            spacing={4}
                            display={'flex'}
                            w={'full'}
                        >
                            <Box
                                w={'full'}
                                flex={1}
                            >
                                <Stack spacing={4} direction="column">
                                    {
                                        posts?.data?.map((post, index) => {
                                            return <CardPost key={index} post={post} />
                                        })
                                    }
                                </Stack>
                            </Box>
                            <Box
                                bg={bg}
                                w={{ base: 'full', lg: '400px' }}
                                display={{ base: 'none', lg: 'block' }}
                                borderRadius="xl"
                                boxShadow={'base'}
                                _dark={{
                                    borderColor: 'primary.900',
                                    borderWidth: 1,
                                    color: 'white',
                                }}
                                maxH={{ base: 'full', lg:'100px' }}
                            >
                                <Stack spacing={4} direction="column">
                                    <CardListCategories /> 
                                </Stack>
                            </Box>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack direction="row" spacing={4}>
                            <Stack direction="column" spacing={4}>
                                <CardPost />
                            </Stack>
                        </Stack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default Home;
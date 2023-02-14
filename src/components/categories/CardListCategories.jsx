import { Box, Card, CardBody, CardHeader, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { getCategories, reset } from '../../features/categorySlice';
import { SpinnerComponent } from '../../helpers/spinner';

const CardListCategories = () => {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const bg = useColorModeValue('white', 'primary.900');

    const { user } = useSelector((state) => state.auth);

    const { categories, isLoading, isError, message } = useSelector((state) => state.categories);

    useEffect(() => {

        dispatch(getCategories());

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
            <Card borderRadius={'lg'} bg={bg} py={1}>
                <CardHeader>
                    <Heading size='md' textAlign={'center'}>CATEGORIES</Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={2} mb={1}>
                        {
                            categories?.data?.map((category, index) => (
                            <Box key={index} p={3} borderWidth={1} borderRadius={'lg'} _hover={{ bg: '#8000800a', borderWidth: '2px', borderColor: '#8000804f' }}>
                                <Link to={`/c/${category?.slug}`}>
                                    <Heading size='xs'>
                                        @{category?.title}
                                    </Heading>
                                    <Text pt='2' fontSize='sm' display={{ base: 'flex', lg: 'none' }}>
                                        {category?.description}
                                    </Text>
                                </Link>
                            </Box>
                            ))
                        }
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default CardListCategories
import {
    Avatar,
    Button, Card, CardBody, Divider,
    Heading, IconButton, Image,
    Stack, Tag, Text,
    useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { BiChat, BiShare, BiHeart, BiBookmarkPlus } from 'react-icons/bi';
import Moment from 'moment';
import { Link } from 'react-router-dom';

const CardPost = ({ post }) => {

    const bgTransparency = useColorModeValue('rgba(0, 0, 0, .07)', 'rgba(255, 255, 255, .2)');

    return (
        <>
            <Card rounded={'xl'} bg={useColorModeValue('white', 'primary.900')}>
                <Image
                    roundedTop={'xl'}
                    objectFit='cover'
                    src={post?.image}
                    alt='Chakra UI'
                    fallbackSrc='https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5rqMjOZkz0xYuq5EW9iUVW/4b9d294957436a9683afbca7aea4df23/tctd2-wony-skyscraper-fallback-bg.jpg'
                    maxH={'350px'}
                    cursor={'pointer'}
                />
                <CardBody>
                    <Stack
                        direction='column'
                        spacing={4}
                        justifyContent={'stretch'}
                        py={2}
                    >
                        <Stack spacing={4} direction={'row'}>
                            <Link
                                to={{
                                    pathname: `/a/${post?.author?.username && post?.author?.username?.replace(/ /g, '-')}/`,
                                }}
                                state={{ id: post?.author?._id }}
                            >
                                <Avatar
                                    borderWidth={'3px'}
                                    borderColor={bgTransparency}
                                    size={'md'}
                                    name={post?.author?.name}
                                    src={post?.author?.image}
                                />
                            </Link>
                            <Stack spacing={0} direction="column" alignSelf={'center'}>
                                <Link
                                    to={{
                                        pathname: `/a/${post?.author?.username && post?.author?.username?.replace(/ /g, '-')}/`,
                                    }}
                                    state={{ id: post?.author?._id }}
                                >
                                    <Text
                                        size='xs'
                                        _hover={{ color: 'purple.400' }}
                                        cursor={'pointer'}
                                        textTransform={'capitalize'}
                                        fontWeight={'bold'}
                                    >
                                        {post?.author?.name}
                                    </Text>
                                </Link>
                                <Text fontWeight="semibold" fontSize={'xs'}>{Moment(post?.createdAt).format('MMMM DD (hh:ss) A')}</Text>
                            </Stack>
                        </Stack>
                        <Link
                            to={{
                                pathname: `/p/${post?.author?.username && post?.author?.username?.replace(/ /g, '-')}/${post?.title && post?.title.replace(/ /g, '-')}`,
                            }}
                            state={{ id: post?._id }}
                        >
                            <Heading size={{ base: 'lg', lg: 'xl' }} textAlign={'justify'} cursor={'pointer'} _hover={{ color: "purple.600" }}>
                                {post?.title}
                            </Heading>
                        </Link>

                        <Text fontSize={{ base: 'xs', lg: 'md'}} textAlign={{ base: "justify", lg: "justify" }}>
                            {
                                post?.tags?.map((tag, index) => (
                                    <Link to={`/t/${tag?.value}`} key={index}>
                                        <Tag key={index} size={{ base: 'sm', lg: 'md'}} variant="undefined" _hover={{ bg: '#26be001a', borderWidth: 1, borderColor: '#26be001a' }} py={2} mr={2} mb={2}>
                                            {tag?.label}
                                        </Tag>
                                    </Link>
                                ))
                            }
                        </Text>
                    </Stack>
                    <Divider my='4' />
                    <Stack direction={{ base: 'column', lg: 'row' }} alignItems='center' justifyContent={'space-between'}>
                        <Stack direction='row' spacing='4' alignItems='center'>
                            <Button variant='outline' colorScheme={'gray'} leftIcon={<BiHeart size={20} />}>
                                1.2K
                            </Button>
                            <Button variant='outline' colorScheme={'gray'} leftIcon={<BiChat size={20} />}>
                                12
                            </Button>
                            <Button variant='outline' colorScheme={'gray'} leftIcon={<BiShare size={20} />}>
                                2
                            </Button>
                        </Stack>
                        <IconButton display={{ base: 'none', lg: 'block' }} variant='ghost' aria-label='Save' colorScheme={'gray'} icon={<BiBookmarkPlus size={20} />} />
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default CardPost
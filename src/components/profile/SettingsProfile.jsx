import {
  Container,
  Stack,
  Text,
  Grid,
  GridItem,
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Textarea,
  FormHelperText,
  Progress
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiContactsLine, RiEmotionLine } from 'react-icons/ri';
import { FaList, FaPodcast, FaQq, FaTags, FaGithub, FaTwitter } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { NavItem } from './../layout/Sidebar';
import { getUser, reset, uploadPhoto, updateProfile } from '../../features/userSlice';
import { ToastChakra } from '../../helpers/toast';

const SettingsProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeLinkcolor = useColorModeValue("purple.500", "white");
  const bgActiveLinkColor = useColorModeValue("#3b49df1a", "#a5b4fc");
  const bg = useColorModeValue('white', 'primary.900');
  const borderColor = useColorModeValue('gray.200', 'primary.700');

  const { user } = useSelector(state => state.auth);
  const { user_detail, isError, message } = useSelector((state) => state.users);

  const [cargando, setCargando] = useState(false);

  const fileInputRef = React.useRef();

  const initialValues = {
    name: '',
    username: '',
    brand_color: '',
    image: '',
    email: '',
    summary: '',
    website: '',
    location: '',
    work: '',
    education: '',
  }

  const [indice, setIndice] = useState(initialValues);

  useEffect(() => {

    dispatch(getUser(user?.data?._id)).then((res) => {
      setIndice(res.payload);
    });

    return () => {
      dispatch(reset())
    }

  }, [navigate, dispatch, user?.data?._id]);

  if (isError) {
    ToastChakra('Error', message, 'error', 1000);
    console.log(message);
  }


  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleUploadImage = () => {
    setCargando(true);
    dispatch(uploadPhoto(image)).then(() => {
      window.location.reload();
      setImage(null);
      fileInputRef.current.value = '';
      setCargando(false);
    }).catch(err => {
      console.error(err);
    });
  }

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  const bytesForHuman = (bytes) => {

    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

    let i = 0

    for (i; bytes > 1024; i++) {
      bytes /= 1024;
    }

    return bytes.toFixed(1) + ' ' + units[i]
  }

  const MENU_PROFILE = [
    {
      name: "Profile",
      icon: RiEmotionLine,
      path: "/profile/settings/profile",
    },
    {
      name: "Customization",
      icon: MdDashboard,
      path: "/listings",
    },
    {
      name: "Notifications",
      icon: RiContactsLine,
      path: "/sponsors",
    },
    {
      name: "Account",
      icon: FaTags,
      path: "/contacts",
    },
    {
      name: "Billing",
      icon: FaPodcast,
      path: "/contacts",
    },
    {
      name: "Organization",
      icon: FaQq,
      path: "/contacts",
    },
    {
      name: "Extensions",
      icon: FaList,
      path: "/contacts",
    },
  ];

  // if (isLoading) {
  //     return <SpinnerComponent />
  // }

  const handleUpdateProfile = () => {
    dispatch(updateProfile(indice)).then(() => {
      window.location.reload();
      navigate('/profile/settings/profile');
    })
  }

  return (
    <Container
      maxW="5xl"
      px={{ base: 8, lg: 0 }}
      mt={20}
    >
      <Stack rounded="md" direction="column" spacing={4}>
        <Text fontSize={{ base: "lg", lg: "2xl" }} fontWeight="extrabold">Settings for ➡️ <span style={{ color: '#3182ce' }}>{user_detail?.username} 😎</span></Text>
        <Grid
          templateColumns='repeat(8, 1fr)'
          templateRows='repeat(1, 1fr)'
          autoRows="minmax(100px, auto)"
          autoColumns="minmax(100px, auto)"
          autoFlow="row dense"
          columnGap={8}
        >
          <GridItem colSpan={{ base: 0, lg: 2 }} w="full" display={{ base: 'none', lg: 'block' }}>
            <Box
              borderRadius={{ base: "none", md: "md" }}
              bg={'transparent'}
            >
              <Flex
                direction={{ base: "row", lg: "column" }}
                fontSize="15px"
                aria-label="Main Navigation"
              >
                {
                  MENU_PROFILE?.map((item, index) => (
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
                }
              </Flex>
            </Box>

          </GridItem>
          <GridItem colSpan={{ base: 8, lg: 6 }} w="full">
            <Stack direction="column" borderRadius="lg" spacing={4}>
              <Stack
                direction={{ base: "column", lg: "row" }}
                justifyContent={'space-between'}
                spacing={4}
                borderRadius="lg"
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                px={6}
                py={6}
              >
                <Button colorScheme="gray" w='full' fontSize={{ base: "sm", lg: "md" }} leftIcon={<FaGithub size={24} />}>Connect Github Account</Button>
                <Button colorScheme="twitter" _dark={{ bg: "blue.500", color: "white", _hover: { bg: "blue.700" } }} w='full' fontSize={{ base: "sm", lg: "md" }} leftIcon={<FaTwitter size={24} />}>Connect Twitter Account</Button>
              </Stack>

              <Stack
                direction="column"
                spacing={4}
                borderRadius="lg"
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                p={6}
              >

                <Text fontSize={{ base: "sm", lg: "xl" }} fontWeight="bold">Upload or update your profile picture</Text>

                <Stack direction={{ base: "column", lg: "row" }} spacing={4}>
                  <Avatar size="xl" alignSelf="center" name={user_detail?.name} src={previewImage ? previewImage : user_detail?.image} />
                  <Stack direction="column" spacing={4} alignSelf="center" w="full">
                    <FormControl>
                      <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="bold">Profile image</FormLabel>
                      <Stack direction="row" spacing={4}>
                        <FormControl id="image">
                          <Input
                            type="file"
                            size={{ base: "xs", lg: "md" }}
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => handlePreviewImage(e)}
                          />
                          {
                            image && (
                              <>
                                <FormHelperText fontSize="sm" color="blue.500">New Image selected: {image.name}</FormHelperText>
                                <FormHelperText fontSize="sm" color="blue.500">Size: {bytesForHuman(image.size)}</FormHelperText>
                              </>
                            )
                          }
                        </FormControl>
                      </Stack>
                    </FormControl>
                  </Stack>
                </Stack>
                {
                  cargando && (
                    <>
                      <Progress hasStripe isIndeterminate />
                      <Text fontSize="sm" color="blue.500">Uploading your photo...</Text>
                    </>
                  )
                }
                <Button
                  colorScheme="blue"
                  _dark={{ bg: "blue.500", color: "white", _hover: { bg: "blue.700" } }}
                  alignSelf="center"
                  w="full"
                  size={{ base: "sm", lg: "md" }}
                  onClick={handleUploadImage}
                  loadingText='Adding your photo...'
                  spinnerPlacement='start'
                  isLoading={cargando ? true : false}
                  isDisabled={image === null ? true : false}
                >
                  Save Profile Image
                </Button>
              </Stack>

              <Stack
                direction="column"
                spacing={2}
                borderRadius="lg"
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                p={6}
              >
                <Text fontSize={{ base: "md", lg: "xl" }} fontWeight="bold">User</Text>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Name</FormLabel>
                  <Input
                    type="text"
                    size={{ base: "xs", lg: "md" }}
                    defaultValue={indice?.name}
                    placeholder="Agyl Blog"
                    onChange={(e) => setIndice({ ...indice, name: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Email</FormLabel>
                  <Input
                    type="email"
                    size={{ base: "xs", lg: "md" }}
                    placeholder="agylblog@gmail.com"
                    defaultValue={indice?.email}
                    onChange={(e) => setIndice({ ...indice, email: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Username</FormLabel>
                  <Input
                    type="text"
                    size={{ base: "xs", lg: "md" }}
                    placeholder="agylblog"
                    defaultValue={indice?.username}
                    onChange={(e) => setIndice({ ...indice, username: e.target.value })}
                  />
                </FormControl>
              </Stack>

              <Stack
                direction="column"
                spacing={2}
                borderRadius="lg"
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                p={6}
              >
                <Text fontSize={{ base: "md", lg: "xl" }} fontWeight="bold">Basic</Text>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Website URL</FormLabel>
                  <Input
                    type="text"
                    size={{ base: "xs", lg: "md" }}
                    defaultValue={indice?.website}
                    placeholder="https://agylblog.com"
                    onChange={(e) => setIndice({ ...indice, website: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Location</FormLabel>
                  <Input
                    type="text"
                    size={{ base: "xs", lg: "md" }}
                    placeholder="Arequipa, Perú"
                    defaultValue={indice?.location}
                    onChange={(e) => setIndice({ ...indice, location: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Bio</FormLabel>
                  <Textarea
                    type="text"
                    size={{ base: "xs", lg: "md" }}
                    placeholder="I'm a software engineer and I love to write about software development."
                    defaultValue={indice?.summary}
                    onChange={(e) => setIndice({ ...indice, summary: e.target.value })}
                  />
                </FormControl>
              </Stack>

              {/** WORK */}

              <Stack
                direction="column"
                spacing={2}
                borderRadius="lg"
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                p={6}
              >
                <Text fontSize={{ base: "md", lg: "xl" }} fontWeight="bold">Work</Text>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Work</FormLabel>
                  <Input
                    type="text"
                    size={{ base: "xs", lg: "md" }}
                    defaultValue={indice?.work}
                    placeholder="Company @AgylCode"
                    onChange={(e) => setIndice({ ...indice, work: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Education</FormLabel>
                  <Input
                    type="text"
                    size={{ base: "xs", lg: "md" }}
                    placeholder="TECSUP, UTEC, UNSA"
                    defaultValue={indice?.education}
                    onChange={(e) => setIndice({ ...indice, education: e.target.value })}
                  />
                </FormControl>
              </Stack>

              <Stack
                direction="column"
                spacing={4}
                borderRadius="lg"
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                p={6}
              >

                <Text fontSize={{ base: "md", lg: "xl" }} fontWeight="bold">Branding</Text>

                <FormControl>
                  <FormLabel fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold">Branding Color</FormLabel>
                  <Input
                    type="color"
                    size={{ base: "xs", lg: "md" }}
                    variant="filled"
                    value={indice ? indice?.brand_color : "#000000"}
                    onChange={(e) => setIndice({ ...indice, brand_color: e.target.value })}
                  />
                </FormControl>

              </Stack>

              <Stack
                direction="column"
                spacing={4}
                borderRadius="lg"
                bg={bg}
                border="1px solid"
                borderColor={borderColor}
                p={6}
              >
                <Button
                  colorScheme="purple"
                  _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.700" } }}
                  alignSelf="center"
                  w="full"
                  size={{ base: "sm", lg: "md" }}
                  onClick={handleUpdateProfile}
                >
                  Save profile information
                </Button>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
      &nbsp;
    </Container>
  )
}

export default SettingsProfile
import { Center, Stack } from "@chakra-ui/react";

import { Spinner } from "react-loading-io";

export function SpinnerComponent () {

    return (
        <Stack px={4} direction="column" justifyContent={'center'} align={'center'} h={'80vh'}>
            <Center alignSelf={'center'}>
                <Stack px={4} direction="column" align={'center'}>
                    <Spinner
                        size={200}
                        type="ball-spin-fade-loader"
                        color="#805ad5"
                    />
                </Stack>
            </Center>
        </Stack>
    )
}
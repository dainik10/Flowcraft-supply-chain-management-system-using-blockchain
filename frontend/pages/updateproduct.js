import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Textarea,
    useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { updateProduct } from '../utils/operations';

export default function UpdateProduct() {

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [data, setData] = useState("");
    const toast = useToast();

    useEffect(() => {
        getLocation()
    }, [!lat])

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude.toString());
                setLng(position.coords.longitude.toString());
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    // var currentTime = new Date();

    // var currentOffset = currentTime.getTimezoneOffset();

    // var ISTOffset = 330;   // IST offset UTC +5:30 

    // var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    // // ISTTime now represents the time in IST coordinates

    // var hoursIST = ISTTime.getHours()
    // var minutesIST = ISTTime.getMinutes()

    var date = Math.floor((Date.now())/1000);

    const updateData = () => {
        updateProduct(lat, lng, parseInt(data.id), data.description, date);
     toast({
       title: "Data Updated Successfully",
       description: "Your product data has been Updated.",
       status: "success",
       duration: 3000,
       isClosable: true,
     });
    }

    return (
        <Flex
            // minH={'90vh'}
            align={'center'}
            justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Update product</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        You can update the product over here.
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    w={['xs', 'sm']}
                >
                    <Stack spacing={4}>
                        <FormControl id="product-id">
                            <FormLabel>Product Id</FormLabel>
                            <Input type="number" name='id' onChange={handleData} />
                        </FormControl>
                        <FormControl id="discription">
                            <FormLabel>Description Of Product</FormLabel>
                            <Textarea name='description' onChange={handleData}></Textarea>
                        </FormControl>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={updateData}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
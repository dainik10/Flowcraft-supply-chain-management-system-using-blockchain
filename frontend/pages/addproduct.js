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
} from "@chakra-ui/react";
import { useState } from "react";
import { addProduct } from "../utils/operations";

export default function AddProduct() {
  const [data, setData] = useState("");
  const toast = useToast();


  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendData = () => {
    addProduct(data.id, data.name, data.description);
    toast({
      title: "Data Added Successfully",
      description: "Your product data has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex
      // minH={'80vh'}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} w={["xs", "sm"]}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Add product</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            You can add products over here.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="product-id">
              <FormLabel>Product Id</FormLabel>
              <Input type="number" name="id" onChange={handleData} />
            </FormControl>
            <FormControl id="name">
              <FormLabel>Product Name</FormLabel>
              <Input type="text" name="name" onChange={handleData} />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description Of Product</FormLabel>
              <Textarea name="description" onChange={handleData}></Textarea>
            </FormControl>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={sendData}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
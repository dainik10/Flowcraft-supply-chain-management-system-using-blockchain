import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  HStack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { connectWallet, getAccount } from "../utils/wallet";

export default function Navbar() {

  const router = useRouter();

  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Create onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Heading fontWeight='600' fontSize='xl'>FlowCraft</Heading>
        <HStack alignItems='center'>
          <Text px='4' fontWeight='500' onClick={() => router.push('/')} cursor='pointer'>Home</Text>
          <Text px='4' fontWeight='500' onClick={() => router.push('/addproduct')} cursor='pointer'>Add Product</Text>
          <Text px='4' fontWeight='500' onClick={() => router.push('/updateproduct')} cursor='pointer'>Update Product</Text>
          <Text px='4' fontWeight='500' onClick={() => router.push('/showhistory')} cursor='pointer'>Show History</Text>
        </HStack>
        <Button onClick={onConnectWallet} variant='outline' colorScheme='linkedin'>
          {account
            ? account.slice(0, 4) +
            "..." +
            account.slice(account.length - 4, account.length)
            : "Connect"}
        
        </Button>
      </Flex>
    </Box>
  );
}
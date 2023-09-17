import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from './Navbar';

function Layout({ children }) {

    return (
        <>
            <Head>
                <title>FlowCraft</title>
                <link rel="shortcut icon" href="/Logo111.png" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Box>
                <Navbar />
                {children}
            </Box>
        </>
    )
}

export default Layout
import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { BrowserRouter } from 'react-router-dom';

import {
  ChakraProvider,
  Box,
   Link,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './App.css';
import { Routes, Route } from 'react-router';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
          <BrowserRouter>            
              <Routes>
                <Route exact path="/" element={<SignIn />}/>
                <Route path="/sign-up" element={<SignUp />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
              </Routes>
            </BrowserRouter>

            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Field Guide
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

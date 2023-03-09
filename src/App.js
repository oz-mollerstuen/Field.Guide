import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import Sidebar from './components/Sidebar/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordForget from './components/PasswordForget/Index.jsx';
import {
  ChakraProvider,
  Box,
  Link,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { mainFirebase } from './components/Firebase/firebase';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <React.Fragment>
              <Router>
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/forget-password" element={<PasswordForget />} />
                  <Route path="/sidebar" element={<Sidebar />} />
                </Routes>
              </Router>
            </React.Fragment>

            <Link
              color="teal.500"
              href="https://www.aa.org/"
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

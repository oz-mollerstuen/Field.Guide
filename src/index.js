import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import {mainFirebase} from "./components/Firebase/firebase"
import { ColorModeScript } from '@chakra-ui/react';

const containerElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(containerElement);
root.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={mainFirebase}> 
      <App />
      <ColorModeScript />
       </FirebaseContext.Provider>
    </React.StrictMode>
 
);

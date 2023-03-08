import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { ColorModeScript } from '@chakra-ui/react';

const containerElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(containerElement);
root.render(

 
    <React.StrictMode>
      <FirebaseContext.Provider value={new Firebase()}> 
      <App />
      <ColorModeScript />
       </FirebaseContext.Provider>
    </React.StrictMode>
 
);

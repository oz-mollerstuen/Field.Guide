import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { ColorModeScript } from '@chakra-ui/react';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <React.StrictMode>
      <App />
      <ColorModeScript />
    </React.StrictMode>
  </FirebaseContext.Provider>
);
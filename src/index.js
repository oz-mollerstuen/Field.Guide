import React from 'react';
import { createRoot as reactDomCreateRoot } from 'react-dom';
import './index.css';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { ColorModeScript } from '@chakra-ui/react';

const container = document.getElementById('root');
const root = reactDomCreateRoot(container);

reactDomCreateRoot(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
    <ColorModeScript />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
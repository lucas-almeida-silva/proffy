import React from 'react';

import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import {AuthProvider} from './contexts/auth';
import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer autoClose={3500}/>
    </AuthProvider>
    
  );
}

export default App;

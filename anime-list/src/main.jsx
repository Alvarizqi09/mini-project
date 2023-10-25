import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './components/WatchList/store'; 
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1007405761192-d3siqc6obfn6hba4s72ffj8fi22567a0.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);


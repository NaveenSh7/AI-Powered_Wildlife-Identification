import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
// Define isLocalhost
const isLocalhost = window.location.hostname === 'localhost';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-pl28u4d5f31ah1z7.us.auth0.com"
    clientId="Tsd1Gqr6K1NcqzoofF2DngR9toKoIDeU"
    authorizationParams={{
      redirect_uri: isLocalhost ? 'http://localhost:3000' : 'http://localhost:3000',
    }}
  >
     <BrowserRouter>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Auth0Provider>,




);


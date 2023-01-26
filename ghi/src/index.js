import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useToken } from "./auth.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, '');

function GetToken() {
  useToken();
  return null;
}

root.render(
    <AuthProvider>
          <BrowserRouter basename={basename}>
              <GetToken />
              <App />
          </BrowserRouter>
    </AuthProvider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain="dev-vnwjwcrifapoxfal.us.auth0.com"
        clientId="OGYgDMe4vkwc5902j9FNEpwMfYg9Ox8n"
        authorizationParams={{
          redirect_uri:"http://localhost:3000/pages/Dashboard"
        }}
      >
        <App />
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);

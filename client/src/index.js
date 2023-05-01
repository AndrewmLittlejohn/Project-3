import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './utils/auth';
import './Globalstyles.css';
import 'bulma/css/bulma.min.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>

      <AuthProvider>
        <App />
      </AuthProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


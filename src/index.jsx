import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

// import amplifyconfig from './amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);

const amplifyConfig = import.meta.env.VITE_APP_FDR_AMPLIFY_CONFIG;
if (!amplifyConfig) {
  console.error('FDR_AMPLIFY_CONFIG is not set.');
} else {
  try {
    const parsedConfig = JSON.parse(amplifyConfig);
    Amplify.configure(parsedConfig);
  } catch (error) {
    console.error('Error parsing FDR_AMPLIFY_CONFIG:', error);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <Authenticator.Provider>
          <App />
      </Authenticator.Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

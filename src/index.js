import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from "@aws-amplify/ui-react";
import { studioTheme } from "./ui-components";

// import amplifyconfig from './amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);

const amplifyConfig = process.env.REACT_APP_FDR_AMPLIFY_CONFIG;
console.log('FDR_AMPLIFY_CONFIG:', amplifyConfig);
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
  <React.StrictMode>
      <ThemeProvider theme={studioTheme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

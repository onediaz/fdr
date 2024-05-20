import './App.css';
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Account from './pages/account';
import Login from './pages/login'
import { useEffect, useState } from 'react'
import Admin from './pages/admin';
import Student from './pages/student';
import Dashboard from './pages/dashboard';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// import amplifyconfig from './amplifyconfiguration.json';
// console.log('FDR_AMPLIFY_CONFIG:', amplifyconfig);
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

export const REACT_APP_API_URL = 'https://main.d6kv4iz3qclfx.amplifyapp.com';
// export const REACT_APP_API_URL = 'http://localhost:3080';

function App({ signOut, user }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [isAdmin, setAdmin] = useState(false)
  
  useEffect(() => {
      // Fetch the user email and token from local storage
      const user = JSON.parse(localStorage.getItem('user'))

      // If the token/email does not exist, mark the user as logged out
      if (!user || !user.token) {
        setLoggedIn(false)
        return
      }

      // If the token exists, verify it with the auth server to see if it is valid
      fetch(`${REACT_APP_API_URL}/verify`, {
        method: 'POST',
        headers: {
          'jwt-token': user.token,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          setLoggedIn('success' === r.message)
          setEmail(user.email || '')
        })
    }, [])
  return (
    <div className="App">
      <Router>
            <Navbar loggedIn={loggedIn} isAdmin={isAdmin} email={email}/>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} isAdmin={isAdmin} setAdmin={setAdmin}/>} />
                <Route path="/account" element={<Account email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEmail={setEmail} isAdmin={isAdmin} setAdmin={setAdmin}/>} />
                <Route path="/login" element={<Login email={email} loggedIn={loggedIn} isAdmin={isAdmin} setLoggedIn={setLoggedIn} setEmail={setEmail} setAdmin={setAdmin} />} />
                <Route path="/admin" element={<Admin email={email} loggedIn={loggedIn} isAdmin={isAdmin} setLoggedIn={setLoggedIn} setEmail={setEmail} setAdmin={setAdmin} />} />
                <Route path="/student" element={<Student email={email} loggedIn={loggedIn} isAdmin={isAdmin} setLoggedIn={setLoggedIn} setEmail={setEmail} setAdmin={setAdmin} />} />
                <Route path="/dashboard/:email" element={<Dashboard email={email} loggedIn={loggedIn} />} />
            </Routes>
        </Router>
    </div>
    
  );
}
export default App;

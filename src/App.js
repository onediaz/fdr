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
import '@aws-amplify/ui-react/styles.css';

export const REACT_APP_API_URL = 'https://main.d6kv4iz3qclfx.amplifyapp.com';
// export const REACT_APP_API_URL = 'http://localhost:3080';

function App({user}) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [isAdmin, setAdmin] = useState(false)
  
  return (
    <div className="App">
        
      <Router>
        <div className='app-nav-bar'>
          <Navbar isAdmin={isAdmin} email={email} setEmail={setEmail}/>
        </div>
        <div className='app-main-body'>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/about" element={<About user={user}/>} />
            <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} isAdmin={isAdmin} setAdmin={setAdmin}/>} />
            <Route path="/account" element={<Account email={email} setEmail={setEmail} isAdmin={isAdmin} setAdmin={setAdmin}/>} />
            <Route path="/login" element={<Login email={email} loggedIn={loggedIn} isAdmin={isAdmin} setLoggedIn={setLoggedIn} setEmail={setEmail} setAdmin={setAdmin} />} />
            <Route path="/admin" element={<Admin email={email} loggedIn={loggedIn} isAdmin={isAdmin} setLoggedIn={setLoggedIn} setEmail={setEmail} setAdmin={setAdmin} />} />
            <Route path="/create-student" element={<Student email={email} loggedIn={loggedIn} isAdmin={isAdmin} setLoggedIn={setLoggedIn} setEmail={setEmail} setAdmin={setAdmin} />} />
            <Route path="/dashboard/:email" element={<Dashboard email={email} loggedIn={loggedIn} />} />
            </Routes>
        </div>
          
          
      </Router>
    </div>
    
  );
}
export default App;

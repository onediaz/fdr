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

function App() {
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
      fetch('http://localhost:3080/verify', {
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

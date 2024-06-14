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
import Dashboard from './pages/dashboard';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes } from '@aws-amplify/auth'; // Import for user data access
import { useAuthenticator} from '@aws-amplify/ui-react';
import Students from './pages/students';
import { getAllStudents, getStudentByEmail } from './functions/get-student';
import { getRole } from './functions/get-role';

export const REACT_APP_API_URL = 'https://main.d6kv4iz3qclfx.amplifyapp.com';
// export const REACT_APP_API_URL = 'http://localhost:3080';

function App({user}) {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [profilePictures, setProfilePictures] = useState({});
  const [studentUser, setStudentUser] = useState(null);

  const resetEmail = async () => {
    try {    
        const tempUser = await fetchUserAttributes();
        setEmail(tempUser.email);
        const role = await getRole();
        if (role === 'admin') {
          setAdmin(true);
        }
        const tempStudentUser = await getStudentByEmail(tempUser.email);
        setStudentUser(tempStudentUser);
    } catch (error){
      console.log('Failed to create: ', error);
    }
  }

  const preloadProfilePictures = async () => {
    const studentsList = await getAllStudents();
    const images = {};
    studentsList.forEach(student => {
        const img = new Image();
        img.src = `https://fdr-storagebae6c-fdr.s3.us-east-2.amazonaws.com/public/${student.profile_picture}`;
        images[student.id] = img;
    });
    setProfilePictures(images);
  };

  useEffect(() => {
    if (authStatus === 'authenticated') {
      resetEmail();
      // setAdmin();
    }
    else {
      console.log('resetting email + studentUser');
      setEmail('');
      setStudentUser(null);
    }
    preloadProfilePictures();
  }, [authStatus]);
  
  return (
    <div className="App">
        
      <Router>
        <div className='app-nav-bar'>
          <Navbar isAdmin={isAdmin} email={email} setEmail={setEmail}/>
        </div>
        <div className='app-main-body'>
          <Routes>
            <Route path="/" element={<Home isAdmin={isAdmin} studentUser={studentUser}/>} />
            <Route path="/dashboard/:email" element={<Dashboard profilePictures={profilePictures} studentUser={studentUser} setStudentUser={setStudentUser}/>} />
            <Route path="/students" element={<Students isAdmin={isAdmin} profilePictures={profilePictures}/>} />
            <Route path="/account" element={<Account studentUser={studentUser} setStudentUser={setStudentUser}/>} />
            <Route path="/about" element={<About />} />
            </Routes>
        </div>
          
          
      </Router>
    </div>
    
  );
}
export default App;

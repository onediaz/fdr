import './App.css';
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import { useEffect, useState } from 'react'
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes } from '@aws-amplify/auth'; // Import for user data access
import { useAuthenticator} from '@aws-amplify/ui-react';
import Students from './pages/students';
import { getAllStudents, getStudentByEmail } from './functions/get-student';
import { getRole } from './functions/get-role';
import { updateStudentBalance } from "./functions/update-students";
import { getOrdinalSuffix } from './functions/get-ordinal-suffix';

export const REACT_APP_API_URL = 'https://main.d6kv4iz3qclfx.amplifyapp.com';
// export const REACT_APP_API_URL = 'http://localhost:3080';

function App() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const [email, setEmail] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [profilePictures, setProfilePictures] = useState({});
  const [studentUser, setStudentUser] = useState(null);
  const [pageViewCount, setPageViewCount] = useState(0);

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

  async function updatePageCount() {
    const studentsList = await getAllStudents();
    const count = studentsList.find(student => student.id === "1");
    setPageViewCount(getOrdinalSuffix(count.balance));
    updateStudentBalance("1", 1);
  }

  useEffect(() => {
    if (authStatus === 'authenticated') {
      resetEmail();
      // setAdmin();
    }
    else {
      setEmail('');
      setStudentUser(null);
    }
    // preloadProfilePictures();
    updatePageCount();
  }, []);
  
  return (
    <div className="App">
        
      <Router>
        <div className='app-nav-bar'>
          <Navbar isAdmin={isAdmin} email={email} setEmail={setEmail}/>
        </div>
        <div className='app-main-body'>
          <Routes>
            <Route path="/" element={<Home isAdmin={isAdmin} studentUser={studentUser} pageViewCount={pageViewCount}/>} />
            {/* <Route path="/dashboard/" element={<Dashboard profilePictures={profilePictures} studentUser={studentUser} setStudentUser={setStudentUser}/>} />
            <Route path="/dashboard/:email" element={<Dashboard profilePictures={profilePictures} studentUser={studentUser} setStudentUser={setStudentUser}/>} /> */}
            <Route path="/students" element={<Students isAdmin={isAdmin} profilePictures={profilePictures}/>} />
            {/* <Route path="/account" element={<Account studentUser={studentUser} setStudentUser={setStudentUser}/>} /> */}
            <Route path="/about" element={<About pageViewCount={pageViewCount}/>} />
            </Routes>
        </div>
          
          
      </Router>
    </div>
    
  );
}
export default App;

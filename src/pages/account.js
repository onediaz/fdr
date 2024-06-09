// pages/account .js

import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { fetchUserAttributes, fetchAuthSession } from '@aws-amplify/auth'; // Import for user data access
import { Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import { createStudent } from '../graphql/mutations';
import { getStudent, listStudents } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";
import { getStudentByEmail } from '../functions/get-student';
const client = generateClient();

const Account = ({studentUser, setStudentUser}) => {
    const { authStatus } = useAuthenticator(context => [context.authStatus]);
    const hasEffectRun = useRef(false);
    // const [name, setStudentName] = useState('');
    const formFields = {
        signUp: {
          email: { order:1 },
          name: { order: 2 },
          nickname: { order: 3 },
          password: { order: 4 },
          confirm_password: { order: 5}
        },
       };

    const createAccount = async () => {
        // first check to see if user is signed in
        try {
            const tempUser = await fetchUserAttributes();
            // second check if studentUser was passed correctly from App.js or if it exists
            const fetchUser = await getStudentByEmail(tempUser.email);
            if (fetchUser) {
                console.log('student user exists: ', fetchUser.email );
            }
            else {
                console.log('student user does not exist');
                console.log(`creating new student ${tempUser.email} with name ${tempUser.name}`);
                const newStudent = await client.graphql({
                    query: createStudent,
                    variables: {
                    input: {
                        email: tempUser.email,
                        name: tempUser.name,
                        balance: 0,
                        isAdmin: false
                    }
                    }
                });
                setStudentUser(fetchUser);
            }
        } catch(error) {
            console.log('user not logged in');
            return;
        }
        
        
    };

    useEffect(() => {
        createAccount();
    }, [studentUser]);

    return (
    <div className={'mainContainer'}>
        <div className={'titleContainer'}>
            <div>Account</div>
        </div>
        <Authenticator formFields={formFields}>
            {({ signOut, user }) => {
                return (
                    <div className='mainContainer'>
                        <div className='textContainer'>
                            Welcome {studentUser && studentUser.email} {studentUser && studentUser.name}
                        </div>
                        <input type='button' className='inputButton' onClick={signOut} value={'Sign out'}/>
                    </div>
                    
                )}
            }
        </Authenticator>
    </div>
  );
};

export default Account;
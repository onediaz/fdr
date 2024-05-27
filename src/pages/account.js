// pages/account .js

import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchUserAttributes } from '@aws-amplify/auth'; // Import for user data access
import { Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import { createStudent } from '../graphql/mutations';
import { listStudents } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";
const client = generateClient();

const Account = (props) => {
    const [email, setEmail] = useState('');
    const { authStatus } = useAuthenticator(context => [context.authStatus]);
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

    const checkAccount = async () => {
        try {    
            const tempUser = await fetchUserAttributes();
            // setStudentName(tempUser.name);
            const allStudents = await client.graphql({
                query: listStudents,
                variables: {
                    filter: {
                        email: {
                            eq: tempUser.email
                        }
                    }
                }
            });
            const student = allStudents.data.listStudents.items;
            const studentExists = student.length === 0 ? false : true;
            console.log('studentExists: ', studentExists);
            if (studentExists === false){
                createAccount(tempUser.name);
            }}
        catch (error){
            console.log('Failed to create: ', error);
        }
    };

    const createAccount = async (name) => {
        try {
            console.log(`creating new student ${email} with name ${name}`);
            const newStudent = await client.graphql({
              query: createStudent,
              variables: {
                input: {
                  email: email,
                  name: name,
                  balance: 1000,
                  isAdmin: false
                }
              }
            });
            console.log('NEW STUDENT: ' + newStudent);
          } catch (error) {
            console.error('Error creating student:', error);
          }
    };

    useEffect(() => {
        if (authStatus === 'authenticated') {
          checkAccount();
        }
      }, [authStatus]);

  return (
    <div className={'mainContainer'}>
        <div className={'titleContainer'}>
            <div>Account</div>
        </div>
        <Authenticator formFields={formFields}>
            {({ signOut, user }) => {
            setEmail(user.signInDetails.loginId);
            return (
                <div className='mainContainer'>
                    <div className='textContainer'>
                        Welcome {email}
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
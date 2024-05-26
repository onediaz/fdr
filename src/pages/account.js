// pages/account .js

import React, { useState } from 'react';
import '../App.css';
// import { fetchUserAttributes } from '@aws-amplify/auth'; // Import for user data access
import { Authenticator} from '@aws-amplify/ui-react';
// import { createStudent } from '../graphql/mutations';
// import { listStudents } from '../graphql/queries';
// import { generateClient } from "aws-amplify/api";
// const client = generateClient();

const Account = (props) => {
    const [email, setEmail] = useState('');
    // const [name, setStudentName] = useState('');
    const formFields = {
        signUp: {
          email: {
            order:1
          },
          name: {
            order: 2
          },
          nickname: {
            order: 3
          },
          password: {
            order: 4
          },
          confirm_password: {
            order: 5
          }
        },
       };

    //    const checkAccount = async () => {
    //     console.log('Checking Account');
    //     const tempUser = await fetchUserAttributes();
    //     // setStudentName(tempUser.name);
    //     console.log(tempUser);
    //     const allStudents = await client.graphql({
    //         query: listStudents,
    //         variables: {
    //             filter: {
    //                 email: {
    //                     eq: tempUser.email
    //                 }
    //             }
    //         }
    //       });
    //       const student = allStudents.data.listStudents.items;
    //       const studentExists = student.length === 0 ? false : true;
    //       if (!studentExists){
    //         createAccount();
    //       }
    //       else {
    //         window.alert('Email already exists');
    //       }
    //   };

    //   const createAccount = async () => {
    //     console.log('Creating New Account');
    //     try {
    //         console.log(`creating new student ${email} with name ${name}`);
    //         const newStudent = await client.graphql({
    //           query: createStudent,
    //           variables: {
    //             input: {
    //               email: email,
    //               name: name,
    //               balance: 1000,
    //               isAdmin: false
    //             }
    //           }
    //         });
    //         console.log('NEW STUDENT: ' + newStudent);
    //       } catch (error) {
    //         console.error('Error creating student:', error);
    //       }
    //   }

  return (
    <div className={'mainContainer'}>
        <div className={'titleContainer'}>
            <div>Account</div>
        </div>
        <Authenticator formFields={formFields} >
            {({ signOut, user }) => {
            setEmail(user.signInDetails.loginId);
            console.log('Authenticator Rendered');
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
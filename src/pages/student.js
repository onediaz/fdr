/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {REACT_APP_API_URL} from '../App';
import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { createStudent } from '../graphql/mutations';
import { listStudents } from '../graphql/queries';
import { gql } from 'aws-amplify';

const client = generateClient();

const Student = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError('');
    setPasswordError('');
    setNameError('');
  
    // Check if the user has entered both fields correctly
    if (name === '') {
      setNameError('Please enter your name')
      return
    }
    if (email === '') {
      setEmailError('Please enter your email')
      return
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
    if (password === '') {
      setPasswordError('Please enter a password')
      return
    }
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    // Authentication calls will be made here...
    // List all items
    console.log('Finding students');
    const allStudents = await client.graphql({
      query: listStudents,
      variables: {
          filter: {
              isAdmin: {
                  eq: true
              }
          }
      }
    });
    console.log(allStudents);

    // if (!oneStudent) {
    //   createAccount()
    // }
    // else {
    //   window.alert('Email already exists')
    // }
  }
  
  const fetchStudentByEmail = async (email) => {
    try {
      const studentData = await client.graphql(listStudents, {
        filter: { email: { eq: email } }
      });
      return studentData.data.listStudents.items;
    } catch (error) {
      console.error("Error fetching student by email:", error);
      return null;
    }
  };

  const createAccount = async () => {
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

  return (
    <div className={'mainContainer'}>
        <div className={'titleContainer'}>
            <div>Add Student</div>
        </div>
        <div className='accountContainer'>
          <div>Name</div>
            <div className={'inputContainer'}>
                <input
                value={name}
                placeholder="Enter your name here"
                onChange={(ev) => setName(ev.target.value)}
                className={'inputBox'}
                />
                <label className="errorLabel">{nameError}</label>
          </div>
            <div>Email</div>
            <div className={'inputContainer'}>
                <input
                value={email}
                placeholder="Enter your email here"
                onChange={(ev) => setEmail(ev.target.value)}
                className={'inputBox'}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <div>Password</div>
            <div className={'inputContainer'}>
                <input
                type='password'
                value={password}
                placeholder="Enter your password here"
                onChange={(ev) => setPassword(ev.target.value)}
                className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
        </div>
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Create Account'} />
        </div>
    </div>
  )
}

export default Student
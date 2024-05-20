/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../App';
import { get, post } from 'aws-amplify/api';
import { signIn } from 'aws-amplify/auth';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  async function signIn({ username, password }) {
    try {
      const isSignedIn  = await signIn({ username, password });
      console.log('success: ' , isSignedIn);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const onButtonClick2 = async () => {
    try {
      const restOperation = get({
        apiName: 'studentsAPI',
        path: '/get-students',
        options: {
          body: {
            message: 'Mow the lawn'
          }
        }
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('POST call succeeded');
      console.log(response);
    } catch (e) {
      console.log('POST call failed: ');
    }
  }

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
    checkAccountExists((accountExists) => {
        // If yes, log in
        if (accountExists) {
          logIn()
        } else {
          window.alert('Wrong email or password')
        }
      })
  }

  // Call the server API to check if the given email ID already exists
  const checkAccountExists = async (callback) => {
    try{
      const response = fetch(`${REACT_APP_API_URL}/check-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response but got something else");
      }
      const data = await response.json();
      console.log('Data:', data);
    }
    catch(error) {
      console.error('Fetch error', error)
    }
    // fetch(`${REACT_APP_API_URL}/check-account`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // })
    //   .then((r) => r.json())
    //   .then((r) => {
    //     callback(r?.userExists)
    //   })
  };
  
  // Log in a user using email and password
  const logIn = () => {
    fetch(`${REACT_APP_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === 'success') {
          window.alert(r.isAdmin)
          localStorage.setItem('user', JSON.stringify({ email, token: r.token}))
          props.setLoggedIn(true)
          props.setEmail(email)
          props.setAdmin(r.isAdmin)
          navigate('/')
        } else {
          window.alert('Wrong email or password')
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        window.alert('An error occurred during login');
      });
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
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
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={signIn(email, password)} value={'Log in'} />
      </div>
          
    </div>
  )
}

export default Login
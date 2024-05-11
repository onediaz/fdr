import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Student = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
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
    checkAccountExists((accountExists) => {
        // If yes, log in
        if (!accountExists){ 
          createAccount()
        } else {
          window.alert('Email already exists')
        }
    });
  }

  // Call the server API to check if the given email ID already exists
  const checkAccountExists = (callback) => {
    fetch('http://localhost:3080/check-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((r) => {
        callback(r?.userExists)
      })
  }
  
  // Log in a user using email and password
  const createAccount = () => {
    fetch('http://localhost:3080/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password , name}),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === 'success') {
          window.alert('Student successfully created')
          navigate('/admin')
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
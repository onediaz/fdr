import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { JSONFilePreset } from 'lowdb/node'
const defaultData = { users: [] }
const db = await JSONFilePreset('database.json', defaultData)

// Initialize Express app
const app = express()
// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic home route for the API
app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
  })

// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post('/auth', (req, res) => {
    console.log("POST Auth")
    const { email, password } = req.body
  
    // Look up the user entry in the database
    // const user = db.data.find((user) => email === user.email)
    const user = db.data['users'].find((user) => email === user.email)
    console.log("This is current database: " , user)
  
    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user != undefined) {
        console.log("FOUND EXISTING USER", user)
        bcrypt.compare(password, user.password, function (_err, result) {
        if (!result) {
          return res.status(401).json({ message: 'Invalid password' })
        } else {
          let loginData = {
            email,
            signInTime: Date.now(),
          }
  
          const token = jwt.sign(loginData, jwtSecretKey)
          res.status(200).json({ message: 'success', token })
        }
      })
      // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
    } else if (user === undefined) {
        console.log("CREATING NEW USER")
        bcrypt.hash(password, 10, function (_err, hash) {
        // db.get('users').push({ email, password: hash }).write()
        db.data.users.push({email, password: hash})
        db.write()
  
        let loginData = {
          email,
          signInTime: Date.now(),
        }
  
        const token = jwt.sign(loginData, jwtSecretKey)
        res.status(200).json({ message: 'success', token })
      })
    }
  })

// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
    const tokenHeaderKey = 'jwt-token'
    const authToken = req.headers[tokenHeaderKey]
    try {
      const verified = jwt.verify(authToken, jwtSecretKey)
      if (verified) {
        return res.status(200).json({ status: 'logged in', message: 'success' })
      } else {
        // Access Denied
        return res.status(401).json({ status: 'invalid auth', message: 'error' })
      }
    } catch (error) {
      // Access Denied
      return res.status(401).json({ status: 'invalid auth', message: 'error' })
    }
  })

  // An endpoint to see if there's an existing account for a given email address
app.post('/check-account', (req, res) => {
    const { email } = req.body
    console.log("POST Check Account")
    console.log(req.body)
  
    // const user = db.data.find((user) => email === user.email)
    const user = db.data['users'].find((user) => email === user.email)
    console.log("TRY AGAIN 5====================")
    console.log("db.data: ", user)
  
    res.status(200).json({
      status: user != undefined ? 'User exists' : 'User does not exist',
      userExists: user != undefined,
    })
  })

app.listen(3080)
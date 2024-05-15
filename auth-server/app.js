import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { JSONFilePreset } from 'lowdb/node'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const defaultData = { users: [] }
const db = await JSONFilePreset('database.json', defaultData)

// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import User from './model/User.js';

mongoose.connect('mongodb://localhost:27017/fdr-db', {
    dbName: 'fdr-db',
    useNewUrlParser: true,
    useUnifiedTopology: true
},).then((res) => {
  console.log("Database connected");
}).catch(error => {
   console.log(error);
 });

// Initialize Express app
const app = express();
// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg';

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic home route for the API
app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
});

app.get('/get-students', async function(_req, res) {
  const students = await User.find({'isAdmin': false});
  res.send(students)
});

app.get('/get-dashboard', async function(req, res) {
  const email = req.query.email;
  const student = await User.findOne({'email': email});
  res.send({email: student.email, balance: student.balance, name: student.name});
});


// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post('/auth', async function(req, res) {
  const { email, password } = req.body;
  // Look up the user entry in the database
  const user = await User.findOne({'email': email}, 'password email isAdmin');

  // If found, compare the hashed passwords and generate the JWT token for the user
  if (user != undefined) {
    bcrypt.compare(password, user.password, function (_err, result) {
      if (!result) {
        return res.status(401).json({ message: 'Invalid password' })
      } else {
        let loginData = {
          email,
          isAdmin: user.isAdmin,
          signInTime: Date.now(),
        }

        const token = jwt.sign(loginData, jwtSecretKey)
        res.status(200).json({ message: 'success', token , isAdmin: user.isAdmin})
      }
    });
  }
});

app.post('/create-account', async function(req, res) {
  console.log('Withing app creating account');
  const { email, password } = req.body;
  // Look up the user entry in the database
  const user = await User.findOne({'email': email}, 'password email isAdmin');
  console.log('checking if user is undefined');
  // If no user is found, create the account
  if (user === null) {
    console.log('creating new user' + req.body.name)
    bcrypt.hash(password, 10, function (_err, hash) {
      const newUser = new User({email: req.body.email, password: hash, name: req.body.name, isAdmin: false, balance: 100});
      newUser.save();
      let loginData = {
        email,
        signInTime: Date.now(),
      };
      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: 'success', token });
    });
  }
});

// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
    const tokenHeaderKey = 'jwt-token';
    const authToken = req.headers[tokenHeaderKey];
    try {
      const verified = jwt.verify(authToken, jwtSecretKey);
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
  });

  // An endpoint to see if there's an existing account for a given email address
app.post('/check-account', async function(req, res) {
  const { email } = req.body;
  const user = await User.findOne({'email': email}, 'password email');
  res.status(200).json({
    status: user != undefined ? 'User exists' : 'User does not exist',
    userExists: user != undefined,
  });
});

app.listen(3080);
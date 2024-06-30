/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



// import { generateClient } from "aws-amplify/api";
// import { listStudents } from '../../../../../src/graphql/queries';
// const client = generateClient();

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// Import the Amplify libraries (assuming you have them installed)
const Amplify = require('aws-amplify');
const { API } = require('@aws-amplify/api'); // For interacting with Amplify APIs
// Configure Amplify with the parsed configuration
const envVars = process.env.REACT_APP_FDR_AMPLIFY_CONFIG;
// Parse the string into a JavaScript object
const amplifyConfig = JSON.parse(envVars);
Amplify.configure(amplifyConfig);

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * Example get method *
 **********************/

app.get('/get-students', async function(req, res) {
  console.log('------------ Here is the API ----------');
  return ['Hi'];
});

app.get('/get-students/*', async function(req, res) {
  // Add your code here
  // const {email} = req.query;
  const email = 'juand4535@gmail.com';
  console.log(email);
  const dashboardStudent = await API.graphql({
    query: listStudents,
    variables: {
        filter: {
            email: {
                eq: email
            }
        }
    }
  });
  if (dashboardStudent.data.listStudents.items.length > 0) {
    console.log(dashboardStudent.data.listStudents.items[0]); // Access the first student
    res.json({success: `get-students/${email} success`, url: req.url});
  } else {
    console.log("No student found with that email.");
    res.json({success: `did not find student`, url: req.url});
  }

  // res.json({success: `get-students/${email} success`, url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/get-students', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/get-students/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/get-students', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/get-students/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/get-students', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/get-students/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

/****************************
* GraphQL Functions *
****************************/

const listStudents =  `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        balance
        isAdmin
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

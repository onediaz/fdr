import axios from 'axios';
import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { listStudents } from '../graphql/queries';
const client = generateClient();

async function getStudent(studentID) {
    try{
        const student = await client.graphql({
            query: listStudents,
            variables: {
                filter: {
                    id: {
                        eq: studentID
                    }
                }
            }
        });
        console.log('success getting student: ', student.data.listStudents.items[0]);
        return student.data.listStudents.items[0];
    } catch (error) {
        console.log('failure getting student by id');
        return [];
    }
  }

  async function getStudentByEmail (studentEmail) {
    try {
        const student = await client.graphql({
            query: listStudents,
            variables: {
                filter: {
                    email: {
                        eq: studentEmail
                    }
                }
            }
        });
        console.log('success getting student by email: ', student.data.listStudents.items[0]);
        return student.data.listStudents.items[0];
    } catch (error) {
        console.log('failure getting student by email');
        return [];
    }
  }

  async function getAllStudents () {
    console.log('fetching students');
    try {
        // const allStudents = await client.graphql({
        //     query: listStudents
        // });
        // return allStudents.data.listStudents.items;
        let res = await axios({
            method: 'get',
            url: 'https://xd68fappf0.execute-api.us-east-2.amazonaws.com/fdr-db/students-db',
            params: {
                TableName: "Student-tejldcxcpnc35hmzlzzrw2blmy-fdr",
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
};
  // Export the function
  export { getStudent, getStudentByEmail, getAllStudents };
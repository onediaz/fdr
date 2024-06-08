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
        return student.data.listStudents.items[0];
    } catch (error) {
        return [];
    }
  }

  async function getStudentByEmail (studentEmail) {
    console.log(studentEmail);
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
        return student.data.listStudents.items[0];
    } catch (error) {
        return [];
    }
  }

  async function getAllStudents () {
    console.log('fetching students');
    try {
        const allStudents = await client.graphql({
            query: listStudents
        });
        return allStudents.data.listStudents.items;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
};
  // Export the function
  export { getStudent, getStudentByEmail, getAllStudents };
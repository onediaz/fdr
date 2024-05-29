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
        return []
    }
  }
  
  // Export the function
  export { getStudent };
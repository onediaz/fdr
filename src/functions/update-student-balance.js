
import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { updateStudent } from '../graphql/mutations';
const client = generateClient();

async function updateStudentBalance(id, amount) {
    console.log('Updating Student Balance');
    try {
        const currentStudentResult = await client.graphql({
            query: updateStudent,
            variables: {
                input: {
                    id: id,
                    balance: amount
                }
            }
        });
        return currentStudentResult;
    } catch (error) {
        return [];
    }
  }
  
  // Export the function
  export { updateStudentBalance };
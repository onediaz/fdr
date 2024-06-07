
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
  
  async function updateStudentProfilePicture (studentId, profilePicture) {
    try {
        //   const input = { id: studentId, profilePicture };
        //   const updatedStudent = await API.graphql(graphqlOperation(updateStudent, { input }));
        const updatedStudent = await client.graphql({
        query: updateStudent,
        variables: {
            input: {
                id: studentId,
                profile_picture: profilePicture
            }
        }
        });
        // return updatedStudent;
        return updatedStudent.data.updateStudent;
    } catch (error) {
      console.error('Error updating student profile picture:', error);
      throw error;
    }
  };

  // Export the function
  export { updateStudentBalance, updateStudentProfilePicture };
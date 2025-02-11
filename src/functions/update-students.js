import axios from 'axios';
import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { updateStudent } from '../graphql/mutations';
import { createTransaction } from "./create-transaction";
const client = generateClient();

async function updateStudentBalance(id, amount) {
    try {
        let res = await axios({
            method: 'put',
            url: 'https://xd68fappf0.execute-api.us-east-2.amazonaws.com/fdr-db/students-db',
            params: {
                TableName: "Student-tejldcxcpnc35hmzlzzrw2blmy-fdr",
                studentId: id,
                amount: amount,
            }
        });
        return res.data;
    } catch (error) {

        return [];
    }
  }
  
  async function updateStudentProfilePicture (studentId, profilePicture) {
    try {
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

async function updateBothStudentBalances(sender, receiver, amount, message) {
    try {
        if (amount < 1){
            window.confirm('Amount must be greater than 0');
        }
        else if (sender.balance > amount && window.confirm(`Do you want to send ${receiver.name} $${amount}?`)) {
            // Update sender student's balance
            const updatedSenderBalance = Number(sender.balance) - Number(amount);
            const senderResult = await updateStudentBalance(sender.id, updatedSenderBalance);

            // Update receiver student's balance
            const updatedReceiverBalance = Number(receiver.balance) + Number(amount);
            const receiverResult = await updateStudentBalance(receiver.id, updatedReceiverBalance);

            // Update local state
            await createTransaction(sender, receiver, amount, message);

            return [senderResult, receiverResult]
        }
    } catch (error) {
        console.log(error);
    }
}

  // Export the function
  export { updateStudentBalance, updateStudentProfilePicture, updateBothStudentBalances};

import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { createTransactions, createTransactionsStudent } from '../graphql/mutations';
const client = generateClient();

async function createTransaction(sender, receiver, amount, message) {
    console.log("Creating Transaction");
    const newTransaction = await client.graphql({
        query: createTransactions,
        variables: {
          input: {
            sender_id: sender.id,
            receiver_id: receiver.id,
            amount: amount,
            sender_name: sender.name,
            receiver_name: receiver.name,
            message: message,
            likes: "{\"total\": 0, \"users\": []}"
          }
        }
      });
    console.log(newTransaction);
    // Create the relationship between the transaction and the sender
    await client.graphql({
        query: createTransactionsStudent,
        variables: {
            input: {
                transactionsId: newTransaction.data.createTransactions.id,
                studentId: sender.id
            }
        }
    });

    // Create the relationship between the transaction and the receiver
    await client.graphql({
        query: createTransactionsStudent,
        variables: {
            input: {
                transactionsId: newTransaction.data.createTransactions.id,
                studentId: receiver.id
            }
        }
    });
    
    
  }
  
  // Export the function
  export { createTransaction };
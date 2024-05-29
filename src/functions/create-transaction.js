
import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { createTransactions, createTransactionsStudent } from '../graphql/mutations';
const client = generateClient();

async function createTransaction(sender, receiver, amount) {
    console.log("This is my function.");
    console.log(sender);
    console.log(receiver);
    const newTransaction = await client.graphql({
        query: createTransactions,
        variables: {
          input: {
            sender: sender.id,
            receiver: receiver.id,
            amount: amount
          }
        }
      });
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
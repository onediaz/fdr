
import { generateClient } from "aws-amplify/api";
// import { createStudent } from './graphql/mutations.js';
import { createTransactions } from '../graphql/mutations';
const client = generateClient();

async function createTransaction(sender, receiver, amount, message) {
  try{
      console.log("Creating Transaction");
      console.log(sender);
      console.log(receiver);
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
      console.log('success creating transaction: ');
    } catch(error) {
      console.log('failed to create transaction');

    }
    
  }
  
  // Export the function
  export { createTransaction };
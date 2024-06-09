import { generateClient } from "aws-amplify/api";
import { listTransactions } from '../graphql/queries';
import { getStudent } from "./get-student";
const client = generateClient();

async function getStudentTransactions(key, studentID) {
    console.log("This is view transactions");
    try {
        let modifiedTransactions = [];
        let studentTransaction = null;
        if(key === 'sender'){
            studentTransaction = await client.graphql({
                query: listTransactions,
                variables: {
                    filter: {
                        sender_id: {
                            eq: studentID
                        },
                    }
                }
            });
        }
        else if(key ==='receiver'){
            studentTransaction = await client.graphql({
                query: listTransactions,
                variables: {
                    filter: {
                        receiver_id: {
                            eq: studentID
                        },
                    }
                }
            });
        }
        const transactions = studentTransaction.data.listTransactions.items;
        for (const item of transactions){
            let obj = {};
            obj['amount'] = item.amount;
            obj['id'] = item.id;
            console.log(item);
            if (key ==='sender'){
                // if looking for sender transactions, we must find receiver info
                obj['receiver'] = await getStudent(item.receiver);
            }
            if (key ==='receiver'){
                // if looking for receiver transactions, we must find sender info
                obj['sender'] = await getStudent(item.sender);
            }
            modifiedTransactions.push(obj);
        }
        console.log('Success within view-transactions');
        return modifiedTransactions;
        // return ['seom', 'hahaha'];
    } catch(error){
        return [];
    }
  }
  
async function getAllTransactions () {
    console.log("Getting all Transactions");
    try {
        const transactions = await client.graphql({query: listTransactions });
        return transactions.data.listTransactions.items;
    } catch (error) {
        return [];
    }
}
  // Export the function
  export { getStudentTransactions, getAllTransactions };
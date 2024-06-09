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

async function getTransactionByID (transactionID) {
    try {
        const transaction = await client.graphql({
            query: listTransactions,
            variables: {
                filter: {
                    id: {
                        eq: transactionID
                    }
                }
            }
        });
        return transaction.data.listTransactions.items[0];
    } catch(error) {
        console.log('failed to get transaction by ID');
        return [];
    }
}

/**
 * 
 * @param {*} transactionID 
 * @param {*} user 
 * @returns 
 */
async function getUserLikedTransaction (transactionID, user) {
    try {
        const transaction = await getTransactionByID(transactionID);
        const likes = JSON.parse(transaction.likes)
        if(likes && likes.users) {
            console.log(likes)
            if(likes.users.includes(user.id)){
                console.log('found user in likes: ', transaction.message);
                return true;
            }
        }
        return false;
    } catch(error) {
        console.log('failed on getUserLikedTransaction');
        return false;
    }
}
  // Export the function
  export { getStudentTransactions, getAllTransactions, getUserLikedTransaction, getTransactionByID };
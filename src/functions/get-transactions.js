import { generateClient } from "aws-amplify/api";
import { listTransactions } from '../graphql/queries';
import { getStudent } from "./get-student";
const client = generateClient();

/**
 * 
 * @param {String} key a string key that allows you to get specific transactions. 
 * 'recent' - gets all transactions
 * 'user' - gets specific user transactions
 * ''
 */
async function getTransactionsByKey (key) {
    return;
}

async function getStudentTransactions(studentID) {
    console.log("Getting Student Transactions");
    let allTransactions = [];
    let nextToken = null;

    do {
        try {
            const transactions = await client.graphql({
                query: listTransactions,
                variables: { nextToken }
            });
            console.log("Transactions response: ", transactions);
            const fetchedTransactions = transactions.data.listTransactions.items;

            // Filter transactions by date
            const recentTransactions = fetchedTransactions.filter(transaction => 
                transaction.sender_id === studentID || transaction.receiver_id === studentID
            );

            allTransactions = allTransactions.concat(recentTransactions);
            nextToken = transactions.data.listTransactions.nextToken;
        } catch (error) {
            console.error("Error fetching transactions: ", error);
            break;
        }
    } while (nextToken);
    console.log('success sender/receiver')
    allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return allTransactions;
}

/**
 * 
 * @returns array of Transaction DB objects, sorted from most recent date to latest date.
 */
async function getAllTransactions () {
    console.log("Getting all Transactions");
    try {
        const transactions = await client.graphql({query: listTransactions });
        console.log(transactions);
        const transactionsArray = transactions.data.listTransactions.items
        transactionsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return transactionsArray;
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
 * @param {Number} days you want previous transactions for.
 * @returns array of Transactions that are within that day range
 */
async function getRecentTransactions(days = 2) {
    console.log("Getting recent Transactions");
    let allTransactions = [];
    let nextToken = null;
    const now = new Date();
    const cutoffDate = new Date(now.setDate(now.getDate() - days)).toISOString();

    do {
        try {
            const transactions = await client.graphql({
                query: listTransactions,
                variables: { nextToken }
            });
            console.log("Transactions response: ", transactions);
            const fetchedTransactions = transactions.data.listTransactions.items;

            // Filter transactions by date
            const recentTransactions = fetchedTransactions.filter(transaction => 
                new Date(transaction.createdAt) >= new Date(cutoffDate)
            );

            allTransactions = allTransactions.concat(recentTransactions);
            nextToken = transactions.data.listTransactions.nextToken;
        } catch (error) {
            console.error("Error fetching transactions: ", error);
            break;
        }
    } while (nextToken);
    console.log('Success day 2');
    allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return allTransactions;
}


/**
 * 
 * @param {*} transactionID 
 * @param {*} user 
 * @returns 
 */
async function getUserLikedTransactionByID (transactionID, user) {
    try {
        const transaction = await getTransactionByID(transactionID);
        const likes = JSON.parse(transaction.likes)
        if(likes && likes.users) {
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

async function getUserLikedTransaction (transaction, user) {
    try {
        const likes = JSON.parse(transaction.likes)
        if(likes && likes.users) {
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
  export { getStudentTransactions, getAllTransactions, getUserLikedTransaction, getUserLikedTransactionByID, getTransactionByID, getRecentTransactions };
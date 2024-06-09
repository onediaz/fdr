import { generateClient } from "aws-amplify/api";
import { updateTransactions } from '../graphql/mutations';
import { getTransactionByID, getUserLikedTransaction } from "./get-transactions";
const client = generateClient();

/**
 * 
 * @param {DB transaction} transaction 
 * @param {DB student} user 
 * if user has already liked the transaction, update transaction to remove the like
 * if user has not liked transaction add user to likes
 * @returns true if user liked the transaction false otherwise
 */
async function updateTransactionLikes(transactionID, user) {
    try {
        const transaction = await getTransactionByID(transactionID);
        let newLikes = 0;
        // check if user has liked transaction already
        const liked = await getUserLikedTransaction(transaction.id, user);
        let likes = JSON.parse(transaction.likes || '{"total":0,"users":[]}');
        // if user liked transaction will be removing user from transaction likes
        if(liked) {
            console.log('Removing users from likes');
            likes.users = likes.users.filter(id => id !== user.id);
            likes.total -= 1;
            newLikes = likes.total;
            likes = JSON.stringify(likes);
        }
        else {
            console.log('Adding user to likes');
            likes.users.push(user.id);
            likes.total += 1;
            newLikes = likes.total;
            likes = JSON.stringify(likes);
        }
        const currentTransactionResult = await client.graphql({
            query: updateTransactions,
            variables: {
                input: {
                    id: transaction.id,
                    likes: likes
                }
            }
        });
        
        return newLikes;
    } catch (error) {
        return [];
    }
};

export {updateTransactionLikes};
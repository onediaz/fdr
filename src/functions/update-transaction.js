import { generateClient } from "aws-amplify/api";
import { updateTransactions } from '../graphql/mutations';
import { getUserLikedTransaction } from "./get-transactions";
const client = generateClient();

/**
 * 
 * @param {DB transaction} transaction 
 * @param {DB student} user 
 * if user has already liked the transaction, update transaction to remove the like
 * if user has not liked transaction add user to likes
 * @returns true if user liked the transaction false otherwise
 */
async function updateTransactionLikes(transaction, user) {
    try {
        let newLikes = 0;
        // check if user has liked transaction already
        const liked = await getUserLikedTransaction(transaction, user);
        let likes = JSON.parse(transaction.likes || '{"total":0,"users":[]}');
        // if user liked transaction will be removing user from transaction likes
        if(liked) {
            likes.users = likes.users.filter(id => id !== user.id);
            likes.total -= 1;
            newLikes = likes.total;
            likes = JSON.stringify(likes);
        }
        else {
            likes.users.push(user.id);
            likes.total += 1;
            newLikes = likes.total;
            likes = JSON.stringify(likes);
        }
        await client.graphql({
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
        console.log(error);
        return [];
    }
};

export {updateTransactionLikes};
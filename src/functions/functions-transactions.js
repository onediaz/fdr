import { removeDuplicates } from "./functions-arrays";

/**
 * 
 * @param {Array} transactions of Transaction DB objects
 * @returns an array with {id: id, label: ''} where label includes message, sender name, and receiver name of all transactions. 
 * the array is sorted alphebatically and removes any duplicates
 */
function createAutoOptions (transactions) {
    let tempOptions = [];
    for (let transaction of transactions) {
        tempOptions.push({id: transaction.id + '_message', label: transaction.message ? transaction.message : ''});
        tempOptions.push({id: transaction.id + '_sender', label: transaction.sender_name ? transaction.sender_name: ''});
        tempOptions.push({id: transaction.id + '_receiver', label: transaction.receiver_name ? transaction.receiver_name: ''});
    }
      tempOptions.sort((a, b) => a.label.localeCompare(b.label));
      return removeDuplicates(tempOptions, 'label');
}

export {createAutoOptions};
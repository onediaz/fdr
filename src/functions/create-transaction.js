import axios from 'axios';

async function createTransaction(sender, receiver, amount, message) {
  try {
    let res = await axios({
      method: 'post',
      url: 'https://xd68fappf0.execute-api.us-east-2.amazonaws.com/fdr-db/transactions-db',
      params: {
          TableName: "Student-tejldcxcpnc35hmzlzzrw2blmy-fdr",
          SenderId: sender.id,
          ReceiverId: receiver.id,
          Amount: amount,
          Sender: sender.name,
          Receiver: receiver.name,
          Message: message
      }
    });
    return res.data;
  } catch (error) {
      return [];
  }
  }
  
  // Export the function
  export { createTransaction };
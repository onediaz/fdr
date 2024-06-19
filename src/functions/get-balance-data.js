import { getRecentTransactions, getStudentTransactions, getTransactionByID } from "./get-transactions";

async function getWeeklyData (user) {
    let weeklyData = [];
    let curBalance = user.balance;
    let transactions = await getRecentTransactions(7);
    transactions = transactions.filter(t => t.sender_name === user.name || t.receiver_name === user.name);
    const now = new Date();
    // Function to get the date string in 'MM/DD' format
    const getDateString = (date) => date.toLocaleDateString('en-US', { month: 'numeric', day: '2-digit' });

    // Loop for the previous 7 days, including today
    for (let day = 0; day < 7; day++) {
        // Create a date for the current day in the loop
        const cutoffDate = new Date(now);
        cutoffDate.setDate(now.getDate() - day);
        const cutoffDateString = getDateString(cutoffDate);

        // Filter transactions for the current day
        let dayTransactions = transactions.filter(t => 
            getDateString(new Date(t.createdAt)) === cutoffDateString
        );

        // Calculate the net amount from transactions
        let dayAmount = await getNetAmountFromTransactions(user, dayTransactions);
        curBalance = curBalance - dayAmount;

        // Push the balance and date into weeklyData
        weeklyData.push({ date: cutoffDateString, balance: curBalance });
    }
    weeklyData.reverse();
    console.log('Returning data');
    return weeklyData;
};

async function getNetAmountFromTransactions(user, transactions) {
    if (transactions.length === 0) {
        return 0;
    }
    let netAmount = 0;
    for(let i = 0; i < transactions.length; i++) {
        let t = transactions[i];
        if(t.sender_name === user.name) {
            netAmount -= t.amount;
        }
        else if(t.receiver_name === user.name) {
            netAmount += t.amount;
        }
    }
    return netAmount;
}

export {getWeeklyData};
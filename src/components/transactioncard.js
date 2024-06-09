// pages/index.js
import './styling/TransactionsComponent.css';
import React from 'react';

const TransactionCardComponent = ({transaction}) => {

    return (
        <div className='transaction-item'>
            <div className='transaction-details'>
                <span className='transaction-date'>
                    {new Date(transaction.updatedAt).toLocaleDateString('en-US', { month: 'numeric', day: '2-digit' })}
                </span>
                <span className='transaction-sender'>
                    {transaction.sender_name}
                </span> 
                    {transaction.amount >= 1 ? "sent": "took"}
                <span className={transaction.amount >= 1 ? 'transaction-amount': 'transaction-amount-negative'}>
                    ${Math.abs(transaction.amount)}
                </span> 
                    {transaction.amount >= 1 ? "to": "from"} 
                <span className='transaction-receiver'>
                    {transaction.receiver_name}
                </span>
            </div>
            <div className='transaction-message'>
                {transaction.message && <div className='transaction-message'>"{transaction.message}"</div>}
            </div>
        </div>
    );
};
export default TransactionCardComponent;

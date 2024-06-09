// pages/index.js
import './styling/TransactionsComponent.css';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from '@aws-amplify/ui-react';
import { getAllTransactions } from '../functions/get-transactions';
import TransactionCardComponent from './transactioncard';

const TransactionsComponent = ({}) => {
    const [transactions, setTransactions] = useState([]);

    const viewTransactions = useCallback(async () => {
      setTransactions([]);
      try {
          const newViewTransaction = await getAllTransactions();
          newViewTransaction.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTransactions(newViewTransaction);
      } catch (error) {
          console.log('Failed to list sent transactions');
      }
  }, []);

  useEffect(() => {
    viewTransactions();
  }, [viewTransactions]);

    return (
      <div className='recent-transactions'>
        
        <ScrollView height="700px" width="450px" maxWidth="100%">
          <ul>
            {transactions.map(transaction => (
                <TransactionCardComponent transaction={transaction}/>

            ))}
          </ul>
        </ScrollView>

      </div>
      
    );
};
export default TransactionsComponent;

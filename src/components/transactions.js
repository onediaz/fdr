// pages/index.js
import './styling/TransactionComponents.css';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from '@aws-amplify/ui-react';
import { getRecentTransactions, getStudentTransactions } from '../functions/get-transactions';
import TransactionCardComponent from './transactioncard';
import TransactionsNavBarComponent from './transactionsnavbar';

const TransactionsComponent = ({user, filterKey}) => {
    const [errorLabel, setErrorLabel] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [loadedTransactions, setLoadedTransactions] = useState([]);
    const [displayCount, setDisplayCount] = useState(10);

    const viewTransactions = useCallback(async () => {
        setTransactions([]);
        try {
            let newViewTransactions = []; 
            if(filterKey === 'recent') {
                newViewTransactions = await getRecentTransactions();
            }
            if(filterKey === 'student') {
                newViewTransactions = await getStudentTransactions(user);
            }
            setTransactions(newViewTransactions);
            setLoadedTransactions(newViewTransactions);
            updateCountAndAutoOptions(newViewTransactions);
        } catch (error) {
            console.log(error);
            console.log('Failed to list sent transactions');
        }
    }, []);

    const updateCountAndAutoOptions = (t) => {
        setDisplayCount(t.length >= 10 ? 10: t.length);
    }

    const loadMoreTransactions = async () => {
        console.log('loading more transactions');
        if (displayCount + 10 >= loadedTransactions.length) {
            setErrorLabel('Maximum transactions');
            setTimeout(() => {
                setErrorLabel('');
            }, 1000);
        }
        const newCount = (loadedTransactions.length>= displayCount + 10 ) ? displayCount+10 : loadedTransactions.length;
        setDisplayCount(prevCount => newCount);
    }

    useEffect(() => {
        viewTransactions();
    }, [user, filterKey]);

    return (
      <div className='recent_transactions'>
        <TransactionsNavBarComponent 
            user={user} 
            transactions={transactions} 
            setDisplayCount={setDisplayCount} 
            setLoadedTransactions={setLoadedTransactions} loadedTransactions={loadedTransactions}
            />
        
        <ScrollView height="700px" maxWidth="100%">
            <div className='transactions_container'>
                <div className='transaction_cards_container'>
                    {loadedTransactions.slice(0, displayCount).map(transaction => (
                        <TransactionCardComponent transaction={transaction} user={user} transactions={transactions} key={transaction.id}/>
                    ))}
                </div>
                <div className='transactions_load_more' onClick={loadMoreTransactions}>
                    <div className='transactions_load_more_error'>{errorLabel}</div>
                    <div className='load_more_button_containter'><div className='transactions_load_more_button'>Load More</div></div>
                </div>
            </div>
        </ScrollView>

      </div>
      
    );
};
export default TransactionsComponent;

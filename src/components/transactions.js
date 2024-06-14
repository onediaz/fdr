// pages/index.js
import './styling/transactionscomponent.css';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Autocomplete, Button, SelectField } from '@aws-amplify/ui-react';
import { getRecentTransactions, getStudentTransactions, getTransactionByID } from '../functions/get-transactions';
import TransactionCardComponent from './transactioncard';
import { sortArrayByAttribute } from '../functions/functions-arrays';
import { createAutoOptions } from '../functions/functions-transactions';

const TransactionsComponent = ({user, filterKey}) => {
    const [errorLabel, setErrorLabel] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [autocompleteKey, setAutocompleteKey] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);
    const [displayCount, setDisplayCount] = useState(10);

    const viewTransactions = useCallback(async () => {
        console.log(filterKey)
        setTransactions([]);
        try {
            let newViewTransactions = []; 
            if(filterKey === 'recent') {
                newViewTransactions = await getRecentTransactions();
            }
            if(filterKey === 'student') {
                newViewTransactions = await getStudentTransactions(user.id);
            }
            setTransactions(newViewTransactions);
            setDisplayCount(newViewTransactions.length >= 10 ? 10: newViewTransactions.length);
            const autoOptions = createAutoOptions(newViewTransactions);
            setAutocompleteOptions(autoOptions);
        } catch (error) {
            console.log(error);
            console.log('Failed to list sent transactions');
        }
    }, [user, filterKey]);

    const loadMoreTransactions = async () => {
        console.log('loading more transactions');
        if (displayCount + 10 >= transactions.length) {
            setErrorLabel('Maximum transactions');
            setTimeout(() => {
                setErrorLabel('');
            }, 1000); // Clear error label after 2 seconds
        }
        const newCount = (transactions.length>= displayCount + 10 ) ? displayCount+10 : transactions.length;
        setDisplayCount(prevCount => newCount)
    }

    const sortTransactions = async (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedTransactions = sortArrayByAttribute(key, direction, transactions);
        setTransactions(sortedTransactions);
        setSortConfig({ key: key, direction: direction });
    };

    const getClassName = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? 'transactions_icon_' + sortConfig.direction : undefined;
    };

    useEffect(() => {
        viewTransactions();
    }, []);

    return (
      <div className='recent_transactions'>
        <div className='transactions_navbar'>
            <div className='transactions_upper_navbar'>
                <Autocomplete
                    label="Autocomplete"
                    options={autocompleteOptions}
                    placeholder="Search messages here..."
                />
            </div>
            <div className='transactions_lower_navbar'>
                <div className='transactions_lower_navbar_buttons'>
                    <Button onClick={() => sortTransactions('createdAt')} className="transactions_sort_button">
                        <div className="transactions_date_button_text"> Date </div> 
                        <div className={getClassName('createdAt') } ></div>
                    </Button>
                    <Button onClick={() => sortTransactions('likes')} className="transactions_sort_button">
                        <div className="transactions_date_button_text"> Likes </div> 
                        <div className={getClassName('likes')}></div>
                    </Button>
                    <Button className="transactions_sort_button" disabled={true}>
                        <div className="transactions_date_button_text"> Test </div> 
                        <div className={getClassName('')}></div>
                    </Button>
                    <SelectField
                        label="all"
                        labelHidden
                        placeholder="All"
                        value={autocompleteKey}
                        onChange={(e) => setAutocompleteKey(e.target.value)}
                    >
                        <option value="sent">Sent</option>
                        <option value="received">Received</option>
                    </SelectField>
                </div>
            </div>
        </div>
        <ScrollView height="700px" maxWidth="100%">
            <div className='transactions_container'>
                <div className='transaction_cards_container'>
                    {transactions.slice(0, displayCount).map(transaction => (
                        <TransactionCardComponent transaction={transaction} user={user}/>
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

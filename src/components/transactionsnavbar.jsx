// pages/index.js
import './styling/TransactionComponents.css';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, SelectField } from '@aws-amplify/ui-react';
import { sortArrayByAttribute } from '../functions/functions-arrays';
import { createAutoOptions } from '../functions/functions-transactions';

const TransactionsNavBarComponent = ({user, transactions, setDisplayCount, loadedTransactions, setLoadedTransactions, filterKey}) => {
    const [transactionType, setTransactionType] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [value, setValue] = useState('');

    const updateAutoOptions = (t) => {
        const autoOptions = createAutoOptions(t);
        setAutocompleteOptions(autoOptions);
    };

    const onSelect = (option) => {
        const { label } = option;
        const newLoadedTransactions = loadedTransactions.filter(t => 
            t.message === label || 
            t.sender_name === label || 
            t.receiver_name === label
        );
        setLoadedTransactions(newLoadedTransactions);
        setValue(label);
      };
    
    const onClear = () => {
        setValue('');
        changeTransactions(transactionType, '');
    };

    const changeTransactions = (val, updatedValue = '') => {
        setTransactionType(val);
        let newTransactions = [];
        if (val === 'sent' && user){
            newTransactions = transactions.filter(transaction => transaction.sender_id === user.id);
        } else if (val === 'received' && user) {
            newTransactions = transactions.filter(transaction => transaction.receiver_id === user.id);
        } else {
            newTransactions = transactions;
        }
        newTransactions = sortConfig ? sortArrayByAttribute(sortConfig.key, sortConfig.direction, newTransactions) : newTransactions;
        newTransactions = updatedValue !== '' ? newTransactions.filter(t => t.message === updatedValue || t.sender_name === updatedValue || t.receiver_name === updatedValue) : newTransactions;
        setLoadedTransactions(newTransactions);
        setDisplayCount(newTransactions.length >= 10 ? 10: newTransactions.length);
    }

    const sortTransactions = async (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedTransactions = sortArrayByAttribute(key, direction, loadedTransactions);
        setLoadedTransactions(sortedTransactions);
        setSortConfig({ key: key, direction: direction });
    };

    const getClassName = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? 'transactions_icon_' + sortConfig.direction : undefined;
    };

    useEffect(() => {
        setDisplayCount(loadedTransactions.length >= 10 ? 10: loadedTransactions.length);
        updateAutoOptions(loadedTransactions);
    }, [user, transactions, loadedTransactions]);

    return (
        <div className='transactions_navbar'>
            <div className='transactions_upper_navbar'>
                <Autocomplete
                    label="Autocomplete"
                    options={autocompleteOptions}
                    placeholder="Search student or messages here..."
                    value={value}
                    onClear={onClear}
                    onSelect={onSelect}
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
                    {/* <Button className="transactions_sort_button" disabled={true}>
                        <div className="transactions_date_button_text"> Test </div> 
                        <div className={getClassName('')}></div>
                    </Button> */}
                    {user && 
                      <SelectField
                          className="transactions_select_field"
                          label=""
                          labelHidden
                          value={transactionType}
                          disabled={filterKey==='all' ? true : false}
                          onChange={(e) => changeTransactions(e.target.value, value)}
                      >
                          <option value="all">All</option>
                          <option value="sent">Sent</option>
                          <option value="received">Received</option>
                      </SelectField>
                    }
                </div>
            </div>
        </div>
      
    );
};
export default TransactionsNavBarComponent;

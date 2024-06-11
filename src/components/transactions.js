// pages/index.js
import './styling/TransactionsComponent.css';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Autocomplete, Button, SelectField } from '@aws-amplify/ui-react';
import { getAllTransactions } from '../functions/get-transactions';
import TransactionCardComponent from './transactioncard';
import { sortArrayByAttribute } from '../functions/sort-arrays';

const TransactionsComponent = ({user}) => {
    const [transactions, setTransactions] = useState([]);
    const [autocompleteKey, setAutocompleteKey] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    const viewTransactions = useCallback(async () => {
      setTransactions([]);
      try {
          const newViewTransaction = await getAllTransactions();
          newViewTransaction.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTransactions(newViewTransaction);
          const tempOptions = []
        //   newViewTransaction.map(transaction => {
        //     tempOptions.push({id: transaction.id, label: transaction.message});
        //   });
          setAutocompleteOptions(tempOptions);

      } catch (error) {
          console.log('Failed to list sent transactions');
      }
  }, []);

  const sortStudents = async (key) => {
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
  }, [viewTransactions]);

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
                    <Button onClick={() => sortStudents('createdAt')} className="transactions_sort_button">
                        <div className="transactions_date_button_text"> Date </div> 
                        <div className={getClassName('createdAt') } ></div>
                    </Button>
                    <Button onClick={() => sortStudents('likes')} className="transactions_sort_button">
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
          <ul>
            {transactions.map(transaction => (
                <TransactionCardComponent transaction={transaction} user={user}/>
            ))}
          </ul>
        </ScrollView>

      </div>
      
    );
};
export default TransactionsComponent;

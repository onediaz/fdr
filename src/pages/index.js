// pages/index.js
import './styling/transactions.css';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllTransactions } from '../functions/view-transactions';

const Home = (props) => {
    const { loggedIn, email} = props
    const [transactions, setTransactions] = useState([]);

    const viewTransactions = useCallback(async () => {
      setTransactions([]);
      try {
          const newViewTransaction = await getAllTransactions();
          newViewTransaction.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          console.log(newViewTransaction);
          setTransactions(newViewTransaction);
      } catch (error) {
          console.log('Failed to list sent transactions');
      }
  }, []);

  useEffect(() => {
    viewTransactions();
  }, [viewTransactions]);

    return (
      <div className="mainContainer">
        <div className='titleContainer'> FDR</div>
        <div className='textContainer'>
          Hi Welcome to FDR. This is a personal project, to advance student learning on income, savings and much much more. 
          My name is Juan, and I am currently teaching Algebra 1 at Franklin D. Roosevelt High School of Innovation. 
          <br/>
          The purpose of my website is for students to get a sense of real life budgeting.
          Students will have their own bank accounts and be able to send/receive money from other students.
          <br/>
          My future goals will be for students to have access to an investing account, and roles that pay them on a schedule. 
        </div>
        
        <div>
        <div className='recent-transactions'>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id} className='transaction-item'>
                <div className='transaction-details'>
                  <span className='transaction-date'>
                    {new Date(transaction.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
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
                {transaction.message && <div className='transaction-message'>"{transaction.message}"</div>}
              </li>
            ))}
          </ul>
        </div>

        </div>
      </div>
      
    );
};
export default Home;

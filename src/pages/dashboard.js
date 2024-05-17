// pages/dashboard.js
import './dashboard.css';

import React from "react";
import { useState, useEffect } from 'react'; 
import { useParams } from "react-router-dom";

const Dashboard = (props) => {
    const propEmail = props.email;
    const { email} = useParams();
    const [balance, setBalance] = useState('');
    const [studentBalance, setStudentBalance] = useState('');
    const [propStudentBalance, setpropStudentBalance] = useState('');
    const [balanceError, setBalanceError] = useState('');
    const [student, setStudent] = useState([]);
    const [propStudent, setPropStudent] = useState([]);
    useEffect(() => { 
        fetch(`http://localhost:3080/get-dashboard?email=${email}`) 
        .then(response => response.json()) 
        .then(data => {
            setStudent(data);
            setStudentBalance(data.balance)
        }) 
        .catch(err => console.error("Error fetching data: ", err)); 
        
        fetch(`http://localhost:3080/get-dashboard?email=${propEmail}`) 
        .then(response => response.json()) 
        .then(data => {
            setPropStudent(data);
            setpropStudentBalance(data.balance)
        }) 
        .catch(err => console.error("Error fetching data: ", err)); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onButtonClick = () => {
        if (email !== propEmail){
            if(balance > propStudent.balance){
                console.log('Available Funds: ' + propStudent.balance);
                console.log('Send Money: ' + balance);
                setBalanceError('Not enough funds available');
            }
            else if(window.confirm("Do you want to send " + balance + " to " + student.name + "?", )){
                console.log('Sending ' + + balance + ' to ' + student.name);
                fetch('http://localhost:3080/transfer-balance', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, propEmail, balance}),
                })
                .then((r) => r.json())
                .then((r) => {
                    if (r.message === 'success') {
                        console.log('Updated balance');
                        setStudentBalance(r.receiverBalance);
                        setpropStudentBalance(r.senderBalance);
                        setBalanceError('');
                    } else {
                        window.alert('Balance could not update')
                    }
                });
            }
            
        }
        return;
    };

    return (
        <div className="dashboardContainer">
            <div className='propContainer'>
                <div className={'dashboardTitle'}>
                    Personal
                </div>
                <div className="textContainer">
                    {propStudent.email}
                </div>
                <div className='balanceContainer'>
                    <div className='balanceText'>Total Balance</div>
                    <div className='balanceAmount'>${propStudentBalance}</div>
                </div>
            </div>
            {email !== propEmail ?
            <div className='studentContainer'>
                <div className='dashboardTitle'> Viewing {student.name}</div>
                <div className="textContainer">
                   {student.email}
                </div>
                <div className='balanceContainer'>
                    <div className='balanceText'>Total Balance</div>
                    <div className='balanceAmount'> ${studentBalance} </div>
                </div>
                <input
                    type = "number"
                    value={balance}
                    placeholder="Enter Balance"
                    onChange={(ev) => setBalance(ev.target.value)}
                    className={'balanceBox'}
                />
                <label className="errorLabel">{balanceError}</label>
                <input type="button" onClick={onButtonClick} value={'Send Money'}/> 
                        
            </div>
            : ''}
        </div>
    );
};

export default Dashboard;

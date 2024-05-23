// pages/dashboard.js
import './dashboard.css';

import React from "react";
import { useState, useEffect } from 'react'; 
import { useParams } from "react-router-dom";
import { REACT_APP_API_URL } from '../App';
import { fetchUserAttributes } from '@aws-amplify/auth'; // Import for user data access
import { getStudent, listStudents } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";
const client = generateClient();

const Dashboard = (props) => {
    const propEmail = props.email;
    const { email} = useParams();
    const [balance, setBalance] = useState('');
    const [studentBalance, setStudentBalance] = useState('');
    const [propStudentBalance, setpropStudentBalance] = useState('');
    const [balanceError, setBalanceError] = useState('');
    const [student, setStudent] = useState([]);
    const [propStudent, setPropStudent] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            // const currentUser = await Auth.currentAuthenticatedUser();
            const currentUser = await fetchUserAttributes();
            setUser(currentUser);
            const dashboardStudent = await client.graphql({
                query: getStudent,
                variables: {
                    // id: email,
                    filter: {
                        email: {
                            eq: email
                        }
                    }
                }
              });
              if (dashboardStudent.data.listStudents.items.length > 0) {
                console.log(dashboardStudent.data.listStudents.items[0]); // Access the first student
              } else {
                console.log("No student found with that email.");
              }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
        };
        fetchUser();
    }, []);

    const onButtonClick2 = () => {
        console.log('User Email: ' + user.email);
        console.log('Dashboard Email: ' + email);
    }

    const onButtonClick = () => {
        if (user.email !== email){
            if(balance > propStudent.balance){
                console.log('Available Funds: ' + propStudent.balance);
                console.log('Send Money: ' + balance);
                setBalanceError('Not enough funds available');
            }
            else if(window.confirm("Do you want to send " + balance + " to " + student.name + "?", )){
                console.log('Sending ' + + balance + ' to ' + student.name);
                fetch(`${REACT_APP_API_URL}/transfer-balance`, {
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
                <div className='dashboardTitle'> Viewing Ha{student.name}</div>
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
                <input type="button" onClick={onButtonClick2} value={'Send Money'}/> 
                        
            </div>
            : ''}
        </div>
    );
};

export default Dashboard;

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
    const { dashboardEmail} = useParams();
    const [balance, setBalance] = useState('');
    const [studentBalance, setStudentBalance] = useState('');
    const [propStudentBalance, setpropStudentBalance] = useState('');
    const [balanceError, setBalanceError] = useState('');
    const [student, setStudent] = useState([]);
    const [propStudent, setPropStudent] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [dashboardStudent, setDashboardStudent] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            // const currentUser = await Auth.currentAuthenticatedUser();
            const currentUser = findStudent((await fetchUserAttributes()).email);
            const dashboardUser = findStudent(dashboardEmail);

            if (currentUser.data.listStudents.items.length > 0) {
                setCurrentStudent(currentUser.data.listStudents.items[0]);
                console.log(currentStudent); // Access the first student
            } else {
                console.log("No student found with that email.");
            }
            if (dashboardUser.data.listStudents.items.length > 0) {
                setDashboardStudent(dashboardUser.data.listStudents.items[0]);
                console.log(dashboardStudent); // Access the first student
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
        console.log('Current Student Email: ' + currentStudent.email);
        console.log('Dashboard Student Email: ' + dashboardStudent.email);
    }

    const findStudent = async (email) => {
        const student = await client.graphql({
            query: listStudents,
            variables: {
                filter: {
                    email: {
                        eq: email
                    }
                }
            }
          });
        return student;
    }

    // const onButtonClick = () => {
    //     if (user.email !== email){
    //         if(balance > propStudent.balance){
    //             console.log('Available Funds: ' + propStudent.balance);
    //             console.log('Send Money: ' + balance);
    //             setBalanceError('Not enough funds available');
    //         }
    //         else if(window.confirm("Do you want to send " + balance + " to " + student.name + "?", )){
    //             console.log('Sending ' + + balance + ' to ' + student.name);
    //             fetch(`${REACT_APP_API_URL}/transfer-balance`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ email, propEmail, balance}),
    //             })
    //             .then((r) => r.json())
    //             .then((r) => {
    //                 if (r.message === 'success') {
    //                     console.log('Updated balance');
    //                     setStudentBalance(r.receiverBalance);
    //                     setpropStudentBalance(r.senderBalance);
    //                     setBalanceError('');
    //                 } else {
    //                     window.alert('Balance could not update')
    //                 }
    //             });
    //         }
            
    //     }
    //     return;
    // };

    return (
        <div className="dashboardContainer">
            <div className='propContainer'>
                <div className={'dashboardTitle'}>
                    Personal
                </div>
                <div className="textContainer">
                    {currentStudent.email}
                </div>
                <div className='balanceContainer'>
                    <div className='balanceText'>Total Balance</div>
                    <div className='balanceAmount'>${currentStudent.balance}</div>
                </div>
            </div>
            {currentStudent.email !== dashboardStudent.email ?
            <div className='studentContainer'>
                <div className='dashboardTitle'> Viewing {dashboardStudent.name}</div>
                <div className="textContainer">
                   {dashboardStudent.email}
                </div>
                <div className='balanceContainer'>
                    <div className='balanceText'>Total Balance</div>
                    <div className='balanceAmount'> ${dashboardStudent.balance} </div>
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

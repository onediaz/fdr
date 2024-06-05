// pages/dashboard.js
import './styling/dashboard.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserAttributes } from '@aws-amplify/auth'; // Import for user data access
import { listStudents } from '../graphql/queries';
import { updateStudent } from '../graphql/mutations';
import { generateClient } from "aws-amplify/api";
import { createTransaction } from '../functions/create-transaction';
import Transactions from './transactions';
const client = generateClient();

const Dashboard = (props) => {
    const { email: dashboardEmail } = useParams();
    const [balance, setBalance] = useState('');
    const [balanceError, setBalanceError] = useState('');
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentStudentBalance, setCurrentStudentBalance] = useState(null);
    const [currentStudentEmail, setCurrentStudentEmail] = useState(null);
    const [dashboardStudent, setDashboardStudent] = useState(null);
    const [dashboardStudentBalance, setDashboardStudentBalance] = useState(null);
    const [dashboardStudentEmail, setDashboardStudentEmail] = useState(null);

    useEffect(() => {
        fetchUser();
        // setDashboard();
    }, [dashboardEmail]);

    const fetchUser = async () => {
        try {
            const tempUser = await fetchUserAttributes();
            if(tempUser){
                const currentUser = await client.graphql({
                    query: listStudents,
                    variables: {
                        filter: {
                            email: {
                                eq: tempUser.email
                            }
                        }
                    }
                });
                if (currentUser.data.listStudents.items.length > 0) {
                    setCurrentStudent(currentUser.data.listStudents.items[0]);
                    setCurrentStudentBalance(currentUser.data.listStudents.items[0].balance);
                    setCurrentStudentEmail(currentUser.data.listStudents.items[0].email);
                } else {
                    console.log("No student found with that email.");
                }
            }
            if(dashboardEmail){
                const dashboardUser = await client.graphql({
                    query: listStudents,
                    variables: {
                        filter: {
                            email: {
                                eq: dashboardEmail
                            }
                        }
                    }
                });
                if (dashboardUser.data.listStudents.items.length > 0) {
                    setDashboardStudent(dashboardUser.data.listStudents.items[0]);
                    setDashboardStudentBalance(dashboardUser.data.listStudents.items[0].balance);
                    setDashboardStudentEmail(dashboardUser.data.listStudents.items[0].email);
                } else {
                    console.log("No student found with that email.");
                }
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    // useEffect(() => {
    //     setDashboard();
    // }, [currentStudent, dashboardStudent]);

    // const setDashboard = () => {
    //     if (dashboardStudent){
    //         setDashboardStudentBalance(dashboardStudent.balance);
    //         setDashboardStudentEmail(dashboardStudent.email);
    //     }
    //     if (currentStudent){
    //         setCurrentStudentBalance(currentStudent.balance);
    //         setCurrentStudentEmail(currentStudent.email);
    //     }
    // };

    const onButtonClick2 = async() => {
        console.log('Current Student:', currentStudent);
        console.log('Dashboard Student:', dashboardStudent);
    
        try {
            if (balance < 1){
                window.confirm('Balance must be greater than 0');
            }
            else if (currentStudentBalance > balance && window.confirm(`Do you want to send ${dashboardStudent.name} $${balance}?`)) {
                // Update current student's balance
                console.log('Updating Balance');
                const updatedCurrentBalance = Number(currentStudentBalance) - Number(balance);
                const currentStudentResult = await client.graphql({
                    query: updateStudent,
                    variables: {
                        input: {
                            id: currentStudent.id,
                            balance: updatedCurrentBalance
                        }
                    }
                });
                console.log('Updated Current Student Balance:', currentStudentResult);
    
                // Update dashboard student's balance
                const updatedDashboardBalance = Number(dashboardStudentBalance) + Number(balance);
                const dashboardStudentResult = await client.graphql({
                    query: updateStudent,
                    variables: {
                        input: {
                            id: dashboardStudent.id,
                            balance: updatedDashboardBalance
                        }
                    }
                });
    
                // Update local state
                setCurrentStudentBalance(updatedCurrentBalance);
                setDashboardStudentBalance(updatedDashboardBalance);
            }
            console.log('Success');
            // CALL CREATE TRANSACTION FUNCTION
            console.log(currentStudent);
            await createTransaction(currentStudent, dashboardStudent, balance);
            setBalance('');
        } catch (error) {
            console.log('Catching Balance Error:');
            console.log(error);
        }
    };    

    return (
        <div>
        <div className="dashboardContainer">
            {currentStudent &&
                <div className='propContainer'>
                    <div className={'dashboardTitle'}>
                        Overview
                    </div>
                        {currentStudentEmail}
                    <div className='balanceContainer'>
                        <div className='balanceText'>Total Balance</div>
                        <div className='balanceAmount'>${currentStudentBalance}</div>
                    </div>
                </div>}
            {dashboardStudent && currentStudentEmail !== dashboardStudentEmail &&
            <div className='studentContainer'>
                <div className='dashboardTitle'> Viewing {dashboardStudent.name}</div>
                   {dashboardStudent.email}
                <div className='balanceContainer'>
                    <div className='balanceText'>Total Balance</div>
                    <div className='balanceAmount'> ${dashboardStudentBalance} </div>
                </div>
                <input
                    type="number"
                    value={balance}
                    min="1"
                    placeholder="Enter Balance"
                    onChange={(ev) => setBalance(ev.target.value)}
                    className={'balanceBox'}
                />
                <label className="errorLabel">{balanceError}</label>
                <input type="button" onClick={onButtonClick2} value={'Send Money'}/> 
            </div>}
        </div>

        {/* {currentStudent && currentStudent.id && <Transactions id={currentStudent.id} name={currentStudent.name}/>} */}
        </div>
    );
};

export default Dashboard;

// pages/dashboard.js
import './dashboard.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserAttributes } from '@aws-amplify/auth'; // Import for user data access
import { listStudents } from '../graphql/queries';
import { updateStudent } from '../graphql/mutations';
import { generateClient } from "aws-amplify/api";
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
                } else {
                    console.log("No student found with that email.");
                }
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        setDashboard();
    }, [currentStudent, dashboardStudent]);

    const setDashboard = () => {
        if (dashboardStudent){
            setDashboardStudentBalance(dashboardStudent.balance);
            setDashboardStudentEmail(dashboardStudent.email);
        }
        if (currentStudent){
            setCurrentStudentBalance(currentStudent.balance);
            setCurrentStudentEmail(currentStudent.email);
        }
    };

    const onButtonClick2 = async() => {
        console.log('Current Student:', currentStudent);
        console.log('Dashboard Student:', dashboardStudent);
    
        try {
            if (currentStudentBalance > balance) {
                // Update current student's balance
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
                console.log('Updated Dashboard Student Balance:', dashboardStudentResult);
    
                // Update local state
                setCurrentStudentBalance(updatedCurrentBalance);
                setDashboardStudentBalance(updatedDashboardBalance);
    
                console.log('Updated Balances:');
                console.log('Current Student Balance:', updatedCurrentBalance);
                console.log('Dashboard Student Balance:', dashboardStudentBalance);
            }
            console.log('Success');
        } catch (error) {
            console.log('Catching Balance Error:');
            console.log(error);
        }
    };    

    return (
        <div className="dashboardContainer">
            {currentStudent &&
                <div className='propContainer'>
                    <div className={'dashboardTitle'}>
                        Personal
                    </div>
                    <div className="textContainer">
                        {currentStudentEmail}
                    </div>
                    <div className='balanceContainer'>
                        <div className='balanceText'>Total Balance</div>
                        <div className='balanceAmount'>${currentStudentBalance}</div>
                    </div>
                </div>}
            {dashboardStudent && currentStudentEmail !== dashboardStudentEmail &&
            <div className='studentContainer'>
                <div className='dashboardTitle'> Viewing {dashboardStudent.name}</div>
                <div className="textContainer">
                   {dashboardStudent.email}
                </div>
                <div className='balanceContainer'>
                    <div className='balanceText'>Total Balance</div>
                    <div className='balanceAmount'> ${dashboardStudentBalance} </div>
                </div>
                <input
                    type="number"
                    value={balance}
                    placeholder="Enter Balance"
                    onChange={(ev) => setBalance(ev.target.value)}
                    className={'balanceBox'}
                />
                <label className="errorLabel">{balanceError}</label>
                <input type="button" onClick={onButtonClick2} value={'Send Money'}/> 
            </div>}
        </div>
    );
};

export default Dashboard;

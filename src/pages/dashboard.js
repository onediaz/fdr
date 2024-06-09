// pages/dashboard.js
import './styling/dashboard.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserAttributes } from '@aws-amplify/auth';
import { createTransaction } from '../functions/create-transaction';
import { updateStudentBalance, updateStudentProfilePicture } from '../functions/update-student-balance';
import { getStudentByEmail } from '../functions/get-student';
import CustomBarChart from '../components/barchart';
import FileUpload from '../components/fileupload';
import { Image } from '@aws-amplify/ui-react';

const Dashboard = (props) => {
    const { email: dashboardEmail } = useParams();
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [balanceError, setBalanceError] = useState('');
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentStudentBalance, setCurrentStudentBalance] = useState(null);
    const [currentStudentEmail, setCurrentStudentEmail] = useState(null);
    const [dashboardStudent, setDashboardStudent] = useState(null);
    const [dashboardStudentBalance, setDashboardStudentBalance] = useState(null);
    const [dashboardStudentEmail, setDashboardStudentEmail] = useState(null);
    const [weeklyData, setWeeklyData] = useState([]);
    const [profilePicture, setProfilePicture] = useState('');
    const [dashboardProfilePicture, setDashboardProfilePicture] = useState('');

    useEffect(() => {
        fetchUser();
        fetchWeeklyData();
    }, [dashboardEmail]);

    const fetchUser = async () => {
        try {
            const tempUser = await fetchUserAttributes();
            if(tempUser){
                const currentUser = await getStudentByEmail(tempUser.email);
                console.log(currentUser);
                if (currentUser) {
                    setCurrentStudent(currentUser);
                    setCurrentStudentBalance(currentUser.balance);
                    setCurrentStudentEmail(currentUser.email);
                    setProfilePicture(currentUser.profile_picture);
                } else {
                    console.log("No student found with that email.");
                }
            }
            if(dashboardEmail){
                const dashboardUser = await getStudentByEmail(dashboardEmail);
                if (dashboardUser) {
                    setDashboardStudent(dashboardUser);
                    setDashboardStudentBalance(dashboardUser.balance);
                    setDashboardStudentEmail(dashboardUser.email);
                    setDashboardProfilePicture(dashboardUser.profile_picture);
                } else {
                    console.log("No student found with that email.");
                }
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

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
                const currentStudentResult = await updateStudentBalance(currentStudent.id, updatedCurrentBalance);
                console.log('Updated Current Student Balance:', currentStudentResult);
    
                // Update dashboard student's balance
                const updatedDashboardBalance = Number(dashboardStudentBalance) + Number(balance);
                const dashboardStudentResult = await updateStudentBalance(dashboardStudent.id, updatedDashboardBalance);
    
                // Update local state
                setCurrentStudentBalance(updatedCurrentBalance);
                setDashboardStudentBalance(updatedDashboardBalance);
            }
            console.log('Success');
            // CALL CREATE TRANSACTION FUNCTION
            console.log(currentStudent);
            await createTransaction(currentStudent, dashboardStudent, balance, message);
            setBalance('');
            setMessage('');
        } catch (error) {
            console.log('Catching Balance Error:');
            console.log(error);
        }
    };

    const fetchWeeklyData = async () => {
        // Mock data for the example. Replace this with your actual fetch logic.
        const mockData = [
            { date: '01/06', balance: 120 },
            { date: '02/06', balance: 150 },
            { date: '03/06', balance: 100 },
            { date: '04/06', balance: 200 },
            { date: '05/06', balance: 170 },
            { date: '06/06', balance: 220 },
            { date: '07/06', balance: 190 }
        ];
        setWeeklyData(mockData);
    };

    const handleProfilePictureUpload = async (key) => {
        try {
          await updateStudentProfilePicture(currentStudent.id, key);
          setProfilePicture(key);
        } catch (error) {
          console.error('Error updating profile picture:', error);
        }
      };

    return (
        <div className="mainDashboardContainer">
            {currentStudent &&
                <div className='dashboardSection'>
                    <div className='dashboardTitle'>
                        Overview
                    </div>
                    
                    <div className='dashboardContent'>
                        <div className="profilePictureContainer">
                            <div className='profilePictureBorder'>
                                <Image
                                    src={props.profilePictures[currentStudent.id].src}
                                    alt={``}
                                    className='profilePicture'
                                />
                            </div>
                            {/* <FileUpload onUpload={handleProfilePictureUpload} /> */}
                        </div>
                        <div className='dashboardRows'>
                            <div className='dashboardRow'>
                                <span className='dashboardName'>{currentStudent.name}</span>
                            </div>
                            <div className='dashboardRow'>
                                <span className='dashboardLabel'>Email: </span>
                                <span className='dashboardValue'>{currentStudentEmail}</span>
                            </div>
                            <div className='dashboardBalanceRow'>
                                <span className='dashboardBalanceLabel'>Total Balance: </span>
                                <span className='dashboardBalanceValue'>${currentStudentBalance}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {dashboardStudent && currentStudentEmail !== dashboardStudentEmail &&
                <div className='studentContainer'>
                    <div className='dashboardSection'>
                        <div className='dashboardTitle'>Send Money </div>
                        <div className='dashboardContent'>
                            <div className="profilePictureContainer">
                                <div className='profilePictureBorder'>
                                    <Image
                                        src={props.profilePictures[dashboardStudent.id].src}
                                        alt={``}
                                        className='profilePicture'
                                    />
                                </div>
                            </div>
                            <div className='dashboardRows'>
                                <div className='dashboardRow'>
                                    <span className='dashboardName'>{dashboardStudent.name}</span>
                                </div>
                                <div className='dashboardRow'>
                                    <span className='dashboardLabel'>Email: </span>
                                    <span className='dashboardValue'>{dashboardStudent.email}</span>
                                </div>
                                <div className='dashboardBalanceRow'>
                                    <span className='dashboardBalanceLabel'>Total Balance: </span>
                                    <span className='dashboardBalanceValue'>${dashboardStudentBalance}</span>
                                </div>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={message}
                            placeholder="Enter Message"
                            onChange={(ev) => setMessage(ev.target.value)}
                            className='balanceBox'
                            maxLength={100}
                        />
                        <input
                            type="number"
                            value={balance}
                            min="1"
                            placeholder="Enter Balance"
                            onChange={(ev) => setBalance(ev.target.value)}
                            className='balanceBox'
                        />
                        <label className="errorLabel">{balanceError}</label>
                        <input type="button" onClick={onButtonClick2} value='Send Money' className='sendMoneyButton' />
                    </div>
                    
                </div>
            }
            {/* <div className="chartContainer">
                <div className="chartTitle">Balance Over the Last 7 Days</div>
                <CustomBarChart data={weeklyData} />
            </div> */}
        </div>
    );
};

export default Dashboard;

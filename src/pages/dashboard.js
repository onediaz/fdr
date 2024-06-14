// pages/dashboard.js
import './styling/dashboard.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStudent, getStudentByEmail } from '../functions/get-student';
import CustomBarChart from '../components/barchart';
import FileUpload from '../components/fileupload';
import { Image } from '@aws-amplify/ui-react';
import DashboardReceiverComponent from '../components/dashboardreceiver';
import DashboardComponent from '../components/dashboard';
import TransactionsComponent from '../components/transactions';

const Dashboard = ({studentUser, setStudentUser}) => {
    const { email: dashboardEmail } = useParams();
    const [dashboardStudent, setDashboardStudent] = useState(null);
    // const [weeklyData, setWeeklyData] = useState([]);
    // const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        fetchUsers();
        // fetchWeeklyData();
    }, [dashboardEmail]);

    const fetchUsers = async () => {
        try {
            const updatedStudentUser = await getStudent(studentUser.id);
            setStudentUser(updatedStudentUser);
            if(dashboardEmail && dashboardEmail !== studentUser.email){
                const updatedDashboardUser = await getStudentByEmail(dashboardEmail);
                setDashboardStudent(updatedDashboardUser);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    // const fetchWeeklyData = async () => {
    //     // Mock data for the example. Replace this with your actual fetch logic.
    //     const mockData = [
    //         { date: '01/06', balance: 120 },
    //         { date: '02/06', balance: 150 },
    //         { date: '03/06', balance: 100 },
    //         { date: '04/06', balance: 200 },
    //         { date: '05/06', balance: 170 },
    //         { date: '06/06', balance: 220 },
    //         { date: '07/06', balance: 190 }
    //     ];
    //     setWeeklyData(mockData);
    // };

    // const handleProfilePictureUpload = async (key) => {
    //     try {
    //       await updateStudentProfilePicture(currentStudent.id, key);
    //       setProfilePicture(key);
    //     } catch (error) {
    //       console.error('Error updating profile picture:', error);
    //     }
    //   };

    return (
        <div className="main_dashboard_container">
            {/* <FileUpload onUpload={handleProfilePictureUpload} /> */}
            <div className='dashboards'>
                {studentUser 
                    && <DashboardComponent studentUser={studentUser} />
                }
                {dashboardStudent && 
                    <DashboardReceiverComponent receiverUser={dashboardStudent} setReceiverUser={setDashboardStudent} studentUser={studentUser} setStudentUser={setStudentUser}/>
                }
            </div>
            <div className='dashboard_transactions'>
                <TransactionsComponent user={studentUser} filterKey="student"/>
            </div>
            {/* <div className="chartContainer">
                <div className="chartTitle">Balance Over the Last 7 Days</div>
                <CustomBarChart data={weeklyData} />
            </div> */}
        </div>
    );
};

export default Dashboard;

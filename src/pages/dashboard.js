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
import { getWeeklyData } from '../functions/get-balance-data';
import { fetchUserAttributes } from '@aws-amplify/auth';

const Dashboard = ({studentUser, setStudentUser}) => {
    const { email: dashboardEmail } = useParams();
    const [dashboardStudent, setDashboardStudent] = useState(null);
    const [weeklyData, setWeeklyData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    // const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [dashboardEmail]);

    const fetchUsers = async () => {
        try {
            let user = studentUser;
            if (!user) {
                const tempUser = await fetchUserAttributes();
                user = await getStudentByEmail(tempUser.email);
            }

            fetchWeeklyData(user);
            if(dashboardEmail && studentUser && dashboardEmail !== studentUser.email){
                const updatedDashboardUser = await getStudentByEmail(dashboardEmail);
                setDashboardStudent(updatedDashboardUser);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchWeeklyData = async (user=studentUser) => {
        let mockData = await getWeeklyData(user);
        setWeeklyData(mockData);
    };

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

                {studentUser && weeklyData.length !== 0 
                    && <div className="chartContainer">
                        <div className="chartTitle">Balance</div>
                            <CustomBarChart data={weeklyData} setSelectedDate={setSelectedDate}/>
                    </div>
                }
            </div>
            <div className='dashboard_transactions'>
                {studentUser
                    && <TransactionsComponent user={studentUser} filterKey="student" dashboardStudent={dashboardStudent} setDashboardStudent={setDashboardStudent} selectedDate={selectedDate}/>}
            </div>
        </div>
    );
};

export default Dashboard;

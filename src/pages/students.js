import React, { useEffect, useState } from "react";
import "./styling/students.css";
import { updateStudentBalance } from '../functions/update-students';
import { createTransaction } from "../functions/create-transaction";
import { getStudentByEmail, getAllStudents } from "../functions/get-student";
import ListStudents from "../components/studentlist";
import StudentComponent from "../components/student";
import ClassroomComponent from "../components/classroom";

const Students = ({isAdmin, profilePictures}) => {
    const [students, setStudents] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getStudents = async () => {
            const studentList = await getAllStudents();
            console.log('logging student list',studentList);
            setStudents(studentList);
        };
        getStudents();
    }, []);

    const onButtonClick = async () => {
        const currentUser = await getStudentByEmail('juand4535@gmail.com');
        if (selectedStudents.length !== 0) {
            selectedStudents.map(student => {
                const updatedBalance = Number(balance) + Number(student.balance);
                updateStudentBalance(student.id, updatedBalance);
                createTransaction(currentUser, student, balance, message);
            });
        } else {
            console.log('no selected students');
        }
    };
    
    return (
        <div className="admin_nav_container">
            <div className="admin_nav_item_container">
                If you are logged in, you can click on a student name to view their balance.
                {/* {students && <ClassroomComponent name={'first'} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents} 
                    students={students} setStudents={setStudents}
                />} */}
                {students && <ListStudents students={students} setStudents={setStudents} isAdmin={isAdmin} profilePictures={profilePictures} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudents}/>}
            </div>
            {isAdmin && 
            <div className="mainDashboardContainer">
                <input type="text" value={message} min="1" placeholder="Enter Message" onChange={(ev) => setMessage(ev.target.value)} className={'balanceBox'}/>
                <input type="number" value={balance} min="1" placeholder="Enter Balance" onChange={(ev) => setBalance(ev.target.value)} className={'balanceBox'}/>
                <input type="button" onClick={onButtonClick} value={'Send Money'}/> 
            </div>
            }
        </div>
    );
};

export default Students;
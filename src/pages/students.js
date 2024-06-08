import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styling/students.css";
import { listStudents } from '../graphql/queries';
import { generateClient } from "aws-amplify/api";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, CheckboxField } from '@aws-amplify/ui-react';
import { updateStudentBalance } from '../functions/update-student-balance';
import { useLocation } from 'react-router-dom';
import { createTransaction } from "../functions/create-transaction";
import { getStudentByEmail, getAllStudents } from "../functions/get-student";
import { sortArrayByAttribute } from "../functions/sort-arrays";
const client = generateClient();

const Students = () => {
    const location = useLocation();
    const isAdmin = location.state?.isAdmin;
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        const getStudents = async () => {
            const studentsList = await getAllStudents();
            setStudents(studentsList);
        };

        getStudents();
    }, []);


    const fetchStudents = async () => {
        console.log('fetching students');
        try {
            const allStudents = await client.graphql({
                query: listStudents
            });
            return allStudents.data.listStudents.items;
        } catch (error) {
            console.error('Error fetching students:', error);
            return [];
        }
    };
    
    const sortStudents = async (key) => {
        console.log('changing direction');
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedStudents = sortArrayByAttribute(key, direction, students);
        console.log(sortedStudents);
        setStudents(sortedStudents);
        setSortConfig({ key: key, direction: direction });
    };

    const getClassName = (name) => {
        if (!sortConfig) {
            return;
          }
          return sortConfig.key === name ? 'students-table-' + sortConfig.direction : undefined;
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedStudents(students);
        } else {
            setSelectedStudents([]);
        }
    };
    
    const handleSelectStudent = (student) => {
        setSelectedStudents(prevSelected => {
            if (prevSelected.some(selectedStudent => selectedStudent.id === student.id)) {
                return prevSelected.filter(selectedStudent => selectedStudent.id !== student.id);
            } else {
                return [...prevSelected, student];
            }
        });
    };

    const onButtonClick = async () => {
        const currentUser = await getStudentByEmail('juand4535@gmail.com');
        if (selectedStudents.length !== 0) {
            selectedStudents.map(student => {
                console.log(student.id);
                const updatedBalance = Number(balance) + Number(student.balance);
                console.log(updatedBalance);
                updateStudentBalance(student.id, updatedBalance);
                createTransaction(currentUser, student, balance, message)
            });
        }
        else {
            console.log('no selected students');
        }
    };
    
    return (
        <div className="admin_nav_container">
            <div className="admin_nav_item_container">
                If you are logged in, you can click on a student name to view their balance.
                <Table highlightOnHover={true} variation="striped">
                    <TableHead >
                        <TableRow>
                            {isAdmin &&
                                <TableCell as="th">
                                    <CheckboxField
                                        onChange={handleSelectAll}
                                        checked={selectedStudents.length === students.length}
                                        label=""
                                    />
                                </TableCell>
                            }
                            <TableCell as="th"> 
                                <div className="student-table-head-cell">
                                    <Button onClick={() => sortStudents('name')} className='students-table-button'>

                                        <div className="table-cell-text"> Name </div>
                                        <div className={getClassName('name')}></div>
                                    </Button>
                                    
                                </div>
                            </TableCell>
                            <TableCell as="th"> 
                                <div className="student-table-head-cell">
                                    <Button onClick={() => sortStudents('email')} className="students-table-button">
                                        <div className="table-cell-text"> Email </div> 
                                        <div className={getClassName('email')}></div>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell as="th"> 
                                <div className="student-table-head-cell">
                                    <Button onClick={() => sortStudents('balance')} className="students-table-button">
                                        <div className="table-cell-text"> Balance </div> 
                                        <div className={getClassName('balance')}></div>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map(student => ( 
                            <TableRow className="students-display" key={student.id}>
                                {isAdmin &&
                                        <TableCell>
                                            <CheckboxField
                                                onChange={() => handleSelectStudent(student)}
                                                checked={selectedStudents.some(selectedStudent => selectedStudent.id === student.id)}
                                                label=""
                                            />
                                        </TableCell>
                                }
                                <TableCell> 
                                    <NavLink to={`/dashboard/${student.email}`} className="student_nav_link"> {student.name} </NavLink> 
                                </TableCell>
                                <TableCell> 
                                    {student.email}
                                </TableCell>
                                <TableCell> 
                                    {student.balance}
                                </TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>
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
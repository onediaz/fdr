import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { listStudents } from '../../graphql/queries';
import { updateStudent } from '../../graphql/mutations';
import { generateClient } from "aws-amplify/api";
import { Tabs, Table, TableBody, TableCell, TableHead, TableRow, Button, CheckboxField } from '@aws-amplify/ui-react';
import { updateStudentBalance } from '../../functions/update-student-balance';
import { useLocation } from 'react-router-dom';
const client = generateClient();

const AdminNavbar = () => {
    const location = useLocation();
    const isAdmin = location.state?.isAdmin;
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [sortOrder, setSortOrder] = useState(true);
    const [sortIcon, setSortIcon] = useState('▼');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const getStudents = async () => {
        const studentsList = await fetchStudents();
        setStudents(studentsList);
        };

        getStudents();
    }, []);


    const fetchStudents = async () => {
        try {
            const allStudents = await client.graphql({
                query: listStudents
            });
            return allStudents.data.listStudents.items;
        } catch (error) {
            console.error('Error fetching students:', error);
            return [];
        }};
    
    const sortStudents = async () => {
        try {
            if (sortOrder){
                const studentList =  await fetchStudents();
                studentList.sort((a,b) =>  b.name.localeCompare(a.name));
                setStudents(studentList);
                setSortOrder(false);
                setSortIcon('▲');
            }
            else {
                const studentList =  await fetchStudents();
                studentList.sort((a,b) =>  a.name.localeCompare(b.name));
                setStudents(studentList);
                setSortOrder(true);
                setSortIcon('▼');
            }
            
        }
        catch(error) {
            console.log('Sorting Error')
        }
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
        if (selectedStudents.length !== 0) {
            selectedStudents.map(student => {
                console.log(student.id);
                const updatedBalance = Number(balance) + Number(student.balance);
                console.log(updatedBalance);
                updateStudentBalance(student.id, updatedBalance);
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
                                <div>
                                    <TableCell as="th">
                                        <CheckboxField
                                            onChange={handleSelectAll}
                                            checked={selectedStudents.length === students.length}
                                            label=""
                                        />
                                    </TableCell>
                                </div>
                            }
                            <TableCell as="th"> 
                                <div className="admin-table-head-cell">
                                    <div className="table-cell-text"> Name </div>
                                    <Button onClick={sortStudents} className="admin-table-button"> {sortIcon} </Button>
                                </div>
                            </TableCell>
                            <TableCell as="th"> 
                                <div className="admin-table-head-cell">
                                    <div className="table-cell-text"> Email </div> 
                                    <Button onClick={() => console.log('hihi')} className="admin-table-button"> O </Button>
                                </div>
                            </TableCell>
                            <TableCell as="th"> 
                                <div className="admin-table-head-cell">
                                    <div className="table-cell-text"> Balance </div> 
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map(student => ( 
                            <TableRow className="students-display" key={student.id}>
                                {isAdmin &&
                                    <div>
                                        <TableCell>
                                            <CheckboxField
                                                onChange={() => handleSelectStudent(student)}
                                                checked={selectedStudents.some(selectedStudent => selectedStudent.id === student.id)}
                                                label=""
                                            />
                                        </TableCell>
                                    </div>
                                }
                                <TableCell> 
                                    <NavLink to={`/dashboard/${student.email}`} className="nav_link"> {student.name} </NavLink> 
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
            <div>
                <input type="number" value={balance} min="1" placeholder="Enter Balance" onChange={(ev) => setBalance(ev.target.value)} className={'balanceBox'}/>
                <input type="button" onClick={onButtonClick} value={'Send Money'}/> 
            </div>
            }
        </div>
    );
};

export default AdminNavbar;
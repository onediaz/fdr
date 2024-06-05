import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { listStudents } from '../../graphql/queries';
import { generateClient } from "aws-amplify/api";
import { Tabs, Table, TableBody, TableCell, TableHead, TableRow, Button, CheckboxField } from '@aws-amplify/ui-react';
const client = generateClient();

const AdminNavbar = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [sortOrder, setSortOrder] = useState(true);
    const [sortIcon, setSortIcon] = useState('▼');

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
            setSelectedStudents(students.map(student => student.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (id) => {
        setSelectedStudents(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(studentId => studentId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };
    
    return (
        <div className="admin_nav_container">
            <div className="admin_nav_item_container">
                If you are logged in, you can click on a student name to view their balance.
                <Table highlightOnHover={true} variation="striped">
                    <TableHead >
                        <TableRow>
                            <TableCell as="th">
                                <CheckboxField
                                    onChange={handleSelectAll}
                                    checked={selectedStudents.length === students.length}
                                    label=""
                                />
                            </TableCell>
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
                                <TableCell>
                                    <CheckboxField
                                        onChange={() => handleSelectStudent(student.id)}
                                        checked={selectedStudents.includes(student.id)}
                                        label=""
                                    />
                                </TableCell>
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
        </div>
    );
};

export default AdminNavbar;
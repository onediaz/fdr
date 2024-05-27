import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { listStudents } from '../../graphql/queries';
import { generateClient } from "aws-amplify/api";
import { Tabs, Table, TableBody, TableCell, TableHead, TableRow } from '@aws-amplify/ui-react';
const client = generateClient();

const AdminNavbar = () => {
    const [students, setStudents] = useState([]);

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
    
    return (
        <div className="admin_nav_container">
            <Tabs
                defaultValue={'Class 1'}
                items={[
                { label: 'Class 1', value: 'Class 1', 
                    content: <div className="admin_nav_item_container">
                    Students
                    <Table highlightOnHover={true} variation="striped">
                        <TableHead>
                            <TableRow>
                                <TableCell as="th"> Name </TableCell>
                                <TableCell as="th"> Email </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(student => ( 
                                <TableRow className="students-display" key={student._id}>
                                    <TableCell> <NavLink to={`/dashboard/${student.email}`} className="nav_link"> {student.name} </NavLink> </TableCell>
                                    <TableCell> {student.email}</TableCell>
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </div>
                },
                { label: 'Class 2', value: 'Class 2', content: 'Class #2' },
                { label: 'Class 3', value: 'Class 3', content: 'Class #3' },
                ]}
            />
        </div>
    );
};

export default AdminNavbar;
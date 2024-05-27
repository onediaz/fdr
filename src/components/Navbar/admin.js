import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { listStudents } from '../../graphql/queries';
import { generateClient } from "aws-amplify/api";
import { Tabs, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@aws-amplify/ui-react';
const client = generateClient();

const AdminNavbar = () => {
    const [students, setStudents] = useState([]);
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
        catch {
            console.log('Sorting Error')
        }
    };
    
    return (
        <div className="admin_nav_container">
            <Tabs
                defaultValue={'Class 1'}
                items={[
                { label: 'Class 1', value: 'Class 1', 
                    content: <div className="admin_nav_item_container">
                    If you are logged in, you can click on a student name to view their balance.
                    <Table highlightOnHover={true} variation="striped">
                        <TableHead>
                            <TableRow>
                                <TableCell as="th"> Name <Button ariaLabel="Arrow Down" size="small" onClick={sortStudents}> {sortIcon} </Button></TableCell>
                                <TableCell as="th"> Email </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(student => ( 
                                <TableRow className="students-display" key={student.id}>
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
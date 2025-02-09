import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "./styling/students.css";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, CheckboxField } from '@aws-amplify/ui-react';
import { sortArrayByAttribute } from "../functions/functions-arrays";

const ListStudents = ({students, setStudents, isAdmin, profilePictures, selectedStudents, setSelectedStudents}) => {
    const [sortConfig, setSortConfig] = useState(null);

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

    return (
        <div>
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
                            Picture
                        </TableCell>
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
                                {profilePictures[student.id] && (
                                    <img
                                        src={profilePictures[student.id].src}
                                        alt=""
                                        className="student-table-profile-picture"
                                    />
                                )}
                            </TableCell>

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
    );
};

export default ListStudents;
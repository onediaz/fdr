import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { listStudents } from '../../graphql/queries';
import { generateClient } from "aws-amplify/api";
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
            <ul className="admin_nav_list">
                <li className="nav_item">
                    <NavLink to="/class" className="nav_link">
                    Classes
                    </NavLink>
                </li>
                <div className="admin_nav_item_container">
                    <li className="nav_item">
                        <NavLink
                        to="/student"
                        className="nav_link"
                        >
                        Students
                        </NavLink>
                    </li>
                    <ul> 
                        {students.map(student => ( 
                            <li className="students-display" key={student._id}>
                                <NavLink to={`/dashboard/${student.email}`} className="nav_link"> {student.name} </NavLink>
                                : {student.email}
                            </li> 
                        ))}
                    </ul> 
                </div>
            </ul>
        </div>
    );
};

export default AdminNavbar;
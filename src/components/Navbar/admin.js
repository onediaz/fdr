import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'; 
import "./navbar.css";

const AdminNavbar = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => { 
        fetch('http://localhost:3080/get-students') 
        .then(response => response.json()) 
        .then(data => setStudents(data)) 
        .catch(err => console.error("Error fetching data: ", err)); 
    }, []); 

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
                                <NavLink to={`/dashboard/${student.email}`} state={{email: student.email}}>
                                    {student.name}
                                </NavLink>
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
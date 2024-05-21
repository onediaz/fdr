import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const AdminNavbar =  () => {
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
                </div>
            </ul>

        </div>
    );
};

export default AdminNavbar;
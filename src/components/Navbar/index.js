import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { fetchUserAttributes, fetchAuthSession } from '@aws-amplify/auth'; // Import for user data access

const Navbar = ({email, setEmail, isAdmin}) => {

    return (
            <div className="nav_container">
                <NavLink to="/" className="nav_logo">
                    WEBSITE
                </NavLink>

                <ul className="nav_list">
                    <li className="nav_item">
                        <NavLink to="/" className="nav_link">
                        Home
                        </NavLink>
                    </li>
                    <li className="nav_item">
                        <NavLink to="/about" className="nav_link"> About </NavLink>
                    </li>
                    <li><NavLink to="/admin" className="nav_link">Students</NavLink></li> 
                    {email ? <li><NavLink to={`/dashboard/${email}`} className="nav_link"> Dashboard </NavLink> </li> : ''}
                    {isAdmin ? <li><NavLink to={`/create-student`} className="nav_link"> Admin </NavLink> </li> : ''}
                    <li> <NavLink to="/account" className="nav_link"> Account </NavLink> </li>
                </ul>

            </div>
    );
};

export default Navbar;
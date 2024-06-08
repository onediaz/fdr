import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { Tabs, Flex } from '@aws-amplify/ui-react';

const Navbar = ({email, setEmail, isAdmin}) => {

    return (
        <div className="nav_container">
            <NavLink to="/" className="nav_logo">
                FDR
            </NavLink>
            <div className="nav_list_container">
                <ul className="nav_list">
                    <li className="nav_item">
                        <NavLink to="/" className="nav_link">
                        Home
                        </NavLink>
                    </li>
                    {email && <li>
                        <NavLink to={`/dashboard/${email}`} className="nav_link"> Dashboard </NavLink> 
                    </li> }
                    <li>
                        <NavLink to="/admin" className="nav_link">Students</NavLink>
                    </li>
                    <li> 
                        <NavLink to="/account" className="nav_link"> Account </NavLink> 
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
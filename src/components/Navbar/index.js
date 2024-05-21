import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = ({loggedIn, isAdmin, email}) => {
    const viewEmail = email;
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
                    <li> <NavLink to="/account" className="nav_link"> Account </NavLink> </li>
                    {/* <li><NavLink to="/login" className="nav_link">Log In</NavLink></li> */}
                    {loggedIn && viewEmail ? <li><NavLink to={`/dashboard/${viewEmail}`} className="nav_link"> Dashboard </NavLink> </li> : ''}
                    <li><NavLink to="/admin" className="nav_link">Admin</NavLink></li> 
                    {/* {isAdmin ?  <li><NavLink to="/admin" className="nav_link">Admin</NavLink></li> : ''} */}
                </ul>

            </div>
    );
};

export default Navbar;
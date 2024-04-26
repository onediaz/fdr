import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        // <>
        //     <Nav>
        //         <Bars />

        //         <NavMenu>
        //             <NavLink to="/" >
        //                     Home
        //             </NavLink>
        //             <NavLink to="/about" >
        //                 About
        //             </NavLink>

        //         </NavMenu>
        //     </Nav>
        // </>
        <header className="header">
            <nav className="nav container">
                <NavLink to="/" className="nav__logo">
                    Navigation Bar
                </NavLink>

                <ul className="nav__list">
                    <li className="nav__item">
                        <NavLink to="/" className="nav__link">
                        Home
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink
                        to="/about"
                        className="nav__link"
                        >
                        About Us
                        </NavLink>
                    </li>
                </ul>

            </nav>
        </header>
    );
};

export default Navbar;
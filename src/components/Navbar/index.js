import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { Tabs, Flex } from '@aws-amplify/ui-react';

const Navbar = ({email, setEmail, isAdmin}) => {

    return (
            <div className="nav_container">
                <Flex direction="column" gap="2rem">
                    <Tabs.Container defaultValue="1">
                    <Tabs.List spacing="equal">

                        <Flex direction="row" gap="2rem">
                            <Tabs.Item value="1">
                                <NavLink to="/" className={({ isActive }) => isActive ? 'custom-tabs-item custom-tabs-item--active' : 'custom-tabs-item'}>
                                    Home
                                </NavLink>
                            </Tabs.Item>
                            {email && (
                                <>
                                    <Tabs.Item value="2">
                                        <NavLink to={`/dashboard/${email}`} className={({ isActive }) => isActive ? 'custom-tabs-item custom-tabs-item--active' : 'custom-tabs-item'}>
                                            Dashboard
                                        </NavLink>
                                    </Tabs.Item>
                                </>
                            )}
                            <Tabs.Item value="3">
                                
                                <NavLink to={{ pathname: "/admin" }} state={ {isAdmin: isAdmin} } className={({ isActive }) => isActive ? 'custom-tabs-item custom-tabs-item--active' : 'custom-tabs-item'}>
                                    Students
                                </NavLink>
                            </Tabs.Item>
                            {isAdmin && (
                                <>
                                    <Tabs.Item value="4">
                                        <NavLink to={`/create-student`} className={({ isActive }) => isActive ? 'custom-tabs-item custom-tabs-item--active' : 'custom-tabs-item'}>
                                            Admin
                                        </NavLink>
                                    </Tabs.Item>
                                </>
                            )}
                            <Tabs.Item value="5">
                                
                                <NavLink to="/account" className={({ isActive }) => isActive ? 'custom-tabs-item custom-tabs-item--active' : 'custom-tabs-item'}>
                                    Account
                                </NavLink>
                            </Tabs.Item>
                        </Flex>
                    </Tabs.List>
                    </Tabs.Container>
                </Flex>

            </div>
    );
};

export default Navbar;
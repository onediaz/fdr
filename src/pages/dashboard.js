// pages/student-dashboard.js

import React from "react";
import { useState, useEffect } from 'react';

const Dashboard = (props) => {
    const { loggedIn, email, isAdmin} = props
    const [balance, setBalance] = useState([]);

    useEffect(() => { 
        fetch(`http://localhost:3080/get-dashboard?email=${email}`) 
        .then(response => response.json()) 
        .then(data => setBalance(data.balance)) 
        .catch(err => console.error("Error fetching data: ", err)); 
    }, []); 

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                Dashboard
            </div>
            <div className="textContainer">
                Balance: {balance}
            </div>
            <div className="buttonContainer">

            </div>
        </div>
    );
};

export default Dashboard;

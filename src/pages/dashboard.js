// pages/dashboard.js

import React from "react";
import { useState, useEffect } from 'react'; 
import { useParams } from "react-router-dom";

const Dashboard = () => {
    const { email} = useParams();
    console.log(email);
    const [student, setStudent] = useState([]);

    useEffect(() => { 
        fetch(`http://localhost:3080/get-dashboard?email=${email}`) 
        .then(response => response.json()) 
        .then(data => setStudent(data)) 
        .catch(err => console.error("Error fetching data: ", err)); 
    }, []); 

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                {student.name}
            </div>
            <div className="textContainer">
                User: {student.email}
                <br/>
                Balance: {student.balance}
            </div>
            <div className="buttonContainer">

            </div>
        </div>
    );
};

export default Dashboard;

// pages/about.js

import React from "react";
import { Image } from '@aws-amplify/ui-react';

const About = (props) => {
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>About Me!</div>
            </div>
            <div className="aboutTextContainer">
                <div className="descriptionContainer">
                    Hello name is Juan, and I am Front-End and Full-Stack Developer with a BS in Computer Science from MIT and 
                    1+ years of experience at Google. I am skilled in JavaScript, React, and AWS. 
                    I am passionate about building responsive web applications and enhancing user experiences. 
                    <br/>
                    <br/>
                    One of my recent projects, which I am particularly proud of, involves building this website 
                    for my students at Franklin D. Roosevelt High School of Innovation. This platform allows students to manage virtual 
                    bank accounts, send and receive money, and learn about real-life budgeting. This project has been a rewarding experience, 
                    seeing students actively use the application to engage with financial concepts in a practical and interactive way.
                    <br/>
                    <br/>
                    This project honed my skills in frontend development, user interface design, and user experience. My role in this project 
                    encompasses the entire development lifecycle. I designed and implemented the application's architecture using React for the 
                    front end and AWS Amplify for authentication and data storage. I also utilized DynamoDB to manage the database, ensuring 
                    efficient and scalable data handling. One feature I am particularly proud of is the ability to sort and filter transactions, 
                    which provides a user-friendly interface for students to manage their finances.
                </div>
                <div className="about_profile">
                    <Image
                        src={'https://fdr-storagebae6c-fdr.s3.us-east-2.amazonaws.com/public/juan_profile.jpg'}
                        alt={``}
                        className='about_profile_picture'
                    />
                </div>
            </div>
            
        </div>
    );
};

export default About;

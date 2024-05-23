// pages/about.js

import React from "react";

const About = (props) => {
    console.log(props);
    const {user} = props;
    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>About Us!</div>
            </div>
            <div className="textContainer"> 
                My name is Juan, and I am currently teaching Algebra 1 at Franklin D. Roosevelt High School of Innovation. 
                <br/>
                The purpose of my website is to create an environment that resembles real life finanical planning. 
                Students will have their own bank accounts and be able to send/receive moeny from other students.
                <br/>
                Some future goals will be for students to have access to an investing bank, where they can see their moeny grow exponentially versus linearly. 
            </div>
            
        </div>
    );
};

export default About;

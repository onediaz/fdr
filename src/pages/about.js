// pages/about.js
import './styling/about.css';
import React from "react";
import { Badge, Divider, Image } from '@aws-amplify/ui-react';
import TransactionsComponent from '../components/transactions';

const About = () => {
    return (
        <div className="about_container">
            <div className="about_content_container">
                <div className='about_text_container'>
                    <div className="about_title">
                        About Me! 
                    </div>
                    <p className='about_paragraph'>
                        Hello my name is 
                        Juan
                        , and I am 
                        <span className='mit'> Front-End and Full-Stack Developer </span>
                        with a 
                        <span className='mit'> BS in Computer Science </span> 
                        from 
                        <span className='mit'> MIT </span> 
                        and over a year of experience at Google.
                    </p>
                    <p className='about_paragraph'>
                        I am passionate about building responsive web applications and enhancing user experiences. 
                    </p>
                    <p className='about_paragraph'> 
                    </p>

                </div>
                <div className="about_image">
                    <Image
                        src={'https://fdr-storagebae6c-fdr.s3.us-east-2.amazonaws.com/public/juan_profile.jpg'}
                        alt={``}
                        className='about_profile_picture'
                    />
                </div>
            </div>
            <div className='about_content_container'>
                <div className="about_transactions">
                    <TransactionsComponent filterKey="all" className="about"/>
                </div>
                <div className='about_text_container'>
                    <div className='about_title'>
                        What I do.
                    </div>
                    <div className='about_paragraph'>
                        Check out this transaction component. You can sort by date, likes, and if you are logged in you can check sent/received transactions.
                    </div>
                    <div className='about_paragraph'>
                        Front end is built using React and Javascript. Database is hosted using DynamoDB from AWS. 
                    </div>
                    <div className='about_paragraph'>
                        <Badge variation="info">Javascript</Badge> 
                        <Badge variation="error">React</Badge> 
                        <Badge variation="success">CSS</Badge> 
                    </div>
                </div>
            </div>
            <div className='about_content_container'>
                <div className='about_title'>
                    Demo Video
                </div>
                <iframe src="https://www.youtube.com/embed/Umo5JbQk5PY" width={"100%"} height={400} allow="fullscreen;"></iframe>
            </div>
        </div>
    );
};

export default About;

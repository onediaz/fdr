// pages/index.js

import React from 'react';

const Home = (props) => {
    const { loggedIn, email} = props
    return (
      <div className="mainContainer">
        <div className='titleContainer'> Home Page</div>
        <div className='textContainer'>Hi Welcome to FDR. This is a personal project, to advance student learning on income, savings and much much more. </div>
      </div>
      
    );
};
export default Home;

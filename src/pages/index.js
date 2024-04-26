// pages/index.js

import React from 'react';

const Home = (props) => {
    const { loggedIn, email } = props
    console.log("Home log: ", loggedIn)
    return (
      <div className="mainContainer">
      <div className='titleContainer'> Home Page</div>
          {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    );
};
export default Home;

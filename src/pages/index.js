// pages/index.js

import React from 'react';

const Home = (props) => {
    const { loggedIn, email, isAdmin} = props
    console.log("Is Admin: ", isAdmin)
    return (
      <div className="mainContainer">
        <div className='titleContainer'> Home Page</div>
        {loggedIn ? <div className='textContainer'>Your email address is {email}</div> : ''}
      </div>
    );
};
export default Home;

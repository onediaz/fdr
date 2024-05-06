// pages/index.js

import React from 'react';

const Home = (props) => {
    const { loggedIn, email, isAdmin} = props
    console.log("Home log: ", isAdmin)
    return (
      <div className="mainContainer">
      <div className='titleContainer'> Home Page</div>
          {loggedIn ? <div>Your email address is {email}</div> : <div />}
          {isAdmin ? <div>Admin: true</div> : <div>Admin: false</div>}
      </div>
    );
};
export default Home;

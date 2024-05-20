// pages/index.js

import React from 'react';

const Home = (props) => {
    const { loggedIn, email, isAdmin} = props
    console.log("Is Admin: ", isAdmin)
    return (
      <div className="mainContainer">
        <div className='titleContainer'> Home Page</div>
        {loggedIn ? <div className='textContainer'>Your email address is {email}</div> : ''}
        <h1>Hello {user.email}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
      
    );
};
export default Home;

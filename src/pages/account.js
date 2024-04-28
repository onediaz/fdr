// pages/account .js

import React from 'react';
import { useNavigate } from 'react-router-dom'
import Login from './login'

const Account = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate()
    console.log("Are we logged in: ", loggedIn)
    const onButtonClick = () => {
        if (loggedIn) {
        localStorage.removeItem('user')
        props.setLoggedIn(false)
        } else {
        navigate('/login')
        }
    }
    
    return (
        <div> 
            {loggedIn
                ? <div className='titleContainer'> Welcome </div>
                : <Login email={props.email} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} setEmail={props.setEmail} />
            }

                {loggedIn ? 
                    <div className='buttonContainer'>
                        {email}
                        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log out'} />
                    </div>
                    : <div />}
        </div>
    );
};

export default Account;
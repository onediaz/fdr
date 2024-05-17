// pages/account .js

import React from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css';

const Account = (props) => {
    const { loggedIn, email} = props
    const navigate = useNavigate()
    const onButtonClick = () => {
        if (loggedIn) {
        localStorage.removeItem('user')
        props.setLoggedIn(false)
        props.setAdmin(false)
        } else {
        navigate('/login')
        }
    }
    
    return (
        <div className='mainContainer'> 
            <div className='titleContainer'> Welcome {} </div>
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
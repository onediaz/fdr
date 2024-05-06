// pages/account .js

import React from 'react';
import { useNavigate } from 'react-router-dom'
import Login from './login'

const Account = (props) => {
    const { loggedIn, email, isAdmin} = props
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
        <div> 
            <div className='titleContainer'> Welcome </div>
            {/* {loggedIn
                ? <div className='titleContainer'> Welcome </div>
                : <Login email={props.email} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} setEmail={props.setEmail} isAdmin={props.isAdmin} setAdmin={props.setAdmin}/>
            } */}

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
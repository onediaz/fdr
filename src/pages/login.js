/* eslint-disable */
import React, { useState } from 'react';

const Login = (props) => {

  const fetchStudents = async () => {
    console.log('Try')
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Account</div>
        <input type='button' className='inputButton' onClick={fetchStudents} value={'BackEnd'}/>
      </div>

    </div>
  )
}

export default Login
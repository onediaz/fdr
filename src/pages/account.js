// pages/account .js

import React, { useState } from 'react';
import '../App.css';
import { get } from 'aws-amplify/api';
import { Authenticator} from '@aws-amplify/ui-react';

const Account = (props) => {
    const [email, setEmail] = useState('');

  const onButtonClick2 = async () => {
    try {
      const restOperation = get({
        apiName: 'studentsAPI',
        path: '/get-students',
        options: {
          body: {
            message: 'Mow the lawn'
          }
        }
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('POST call succeeded');
      console.log(response);
    } catch (e) {
      console.log('POST call failed: ');
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Account</div>
      </div>
      <Authenticator>
        {({ signOut, user }) => {
          setEmail(user.signInDetails.loginId);
          return (
            <div className='mainContainer'>
              <div className='textContainer'>
              Welcome {email}
              </div>
              <input type='button' className='inputButton' onClick={signOut} value={'Sign out'}/>
              <input type='button' className='inputButton' onClick={onButtonClick2} value={'GET Request'}/>
            </div>
            
          )}
        }
      </Authenticator>
    </div>
  );
};

export default Account;
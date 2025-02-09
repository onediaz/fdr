// components/dashboardreceiver.js
import './styling/dashboardcomponent.css';
import React, { useState } from 'react';
import { Image } from '@aws-amplify/ui-react';
import { updateBothStudentBalances } from '../functions/update-students';
const DashboardReceiverComponent = ({receiverUser, setReceiverUser, studentUser, setStudentUser}) => {
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState('');
    const [balanceError, setBalanceError] = useState('');

    const onButtonClick2 = async () => {
        try{
            const result = await updateBothStudentBalances(studentUser, receiverUser, balance, message);
            setReceiverUser(result[1]);
            setStudentUser(result[0]);
            setBalance('');
            setMessage('');
        } catch (error) {
            console.log('failed to update balances');
            console.log(error);
        }
    };

    return (
        <div>
            {receiverUser &&
                <div className='dashboard_section'>
                    <div className='dashboard_title'>
                        Pay or Request
                    </div>
                    <div className='dashboard_content'>
                        <div className="profile_picture_container">
                            <div className='profile_picture_border'>
                                <Image
                                    src={`https://fdr-storagebae6c-fdr.s3.us-east-2.amazonaws.com/public/${receiverUser.profile_picture}`}
                                    alt={``}
                                    className='profile_picture'
                                />
                            </div>
                            <div className='dashboard_balance_row'>
                                <span className='dashboard_balance_label'>Total Balance: </span>
                                <span className='dashboard_balance_value'>${receiverUser.balance}</span>
                            </div>
                        </div>
                        <div className='dashboard_rows'>
                            <div className='dashboard_row'>
                                <span className='dashboard_name'>{receiverUser.name}</span>
                            </div>
                            <div className='dashboard_row'>
                                <span className='dashboard_label'>Email: </span>
                                <span className='dashboard_value'>{receiverUser.email}</span>
                            </div>
                            <input
                                type="text"
                                value={message}
                                placeholder="Enter Message"
                                onChange={(ev) => setMessage(ev.target.value)}
                                className='balanceBox'
                                maxLength={100}
                            />
                            <input
                                type="number"
                                value={balance}
                                min="1"
                                placeholder="Enter Balance"
                                onChange={(ev) => setBalance(ev.target.value)}
                                className='balanceBox'
                            />
                            <label className="errorLabel">{balanceError}</label>
                            <input type="button" onClick={onButtonClick2} value='Send Money' className='sendMoneyButton' />
                            
                        </div>
                    </div>
                    
                </div>
            }
        </div>
    );
};

export default DashboardReceiverComponent;

// components/dashboard.js
import './styling/dashboardcomponent.css';
import React, { useState } from 'react';
import { Image } from '@aws-amplify/ui-react';

const DashboardComponent = ({ studentUser }) => {
  return (
    <div>
        {studentUser &&
            <div className='dashboard_section'>
                <div className='dashboard_title'>
                    Overview
                </div>
                <div className='dashboard_content'>
                    <div className="profile_picture_container">
                        <div className='profile_picture_border'>
                            <Image
                                src={`https://fdr-storagebae6c-fdr.s3.us-east-2.amazonaws.com/public/${studentUser.profile_picture}`}
                                alt={``}
                                className='profile_picture'
                            />
                        </div>
                        <div className='dashboard_balance_row'>
                            <span className='dashboard_balance_label'>Total Balance: </span>
                            <span className='dashboard_balance_value'>${studentUser.balance}</span>
                        </div>
                    </div>
                    <div className='dashboard_rows'>
                        <div className='dashboard_row'>
                            <span className='dashboard_name'>{studentUser.name}</span>
                        </div>
                        <div className='dashboard_row'>
                            <span className='dashboard_label'>Email: </span>
                            <span className='dashboard_value'>{studentUser.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  );
};

export default DashboardComponent;

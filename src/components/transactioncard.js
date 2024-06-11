// pages/index.js
import { getUserLikedTransaction } from '../functions/get-transactions';
import { updateTransactionLikes } from '../functions/update-transaction';
import './styling/TransactionsComponent.css';
import React, { useEffect, useState } from 'react';

const TransactionCardComponent = ({transaction, user}) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    const updateLikes = async () => {
        const newLikes = await updateTransactionLikes(transaction.id, user);
        setLikes(newLikes);
        setLiked(!liked);
    };

    useEffect(() => {
        const onLoad = async () => {
            console.log('On Load');
            try {
                if (user) {
                    setIsDisabled(false);
                    const userLiked = await getUserLikedTransaction(transaction.id, user);
                    setLiked(userLiked);
                }
                const tempLikes = JSON.parse(transaction.likes);
                if (tempLikes) {
                    setLikes(tempLikes.total);
                }
            } catch(error) {
                console.log('failed on load');
            }
        };
        onLoad();
    }, [user, transaction]);

    return (
        <div className='transaction_item'>
            <div className='transaction_upper_details'>
                <span className='transaction_date'>
                    {new Date(transaction.createdAt).toLocaleDateString('en-US', { month: 'numeric', day: '2-digit' })}
                </span>
                <span className='transaction_sender'>
                    {transaction.sender_name}
                </span> 
                    {transaction.amount >= 1 ? "sent": "took"}
                <span className={transaction.amount >= 1 ? 'transaction_amount': 'transaction_amount_negative'}>
                    ${Math.abs(transaction.amount)}
                </span> 
                    {transaction.amount >= 1 ? "to": "from"} 
                <span className='transaction_receiver'>
                    {transaction.receiver_name}
                </span>
            </div>
            <div className='transaction_lower_details'>
                {transaction.message ? <div className='transaction_message'>"{transaction.message}"</div> : <div className='transaction_message'></div>}
                <div className='transaction_likes'> {likes}</div>
                <button className={`transaction_likes_img ${liked ? 'liked' : 'unliked'}`}  onClick={updateLikes} disabled={isDisabled}>
                    {liked ? '♥' : '♡'} 
                </button>
            </div>
        </div>
    );
};
export default TransactionCardComponent;

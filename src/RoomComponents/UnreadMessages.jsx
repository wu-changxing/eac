// src/components/UnreadMessages.js
import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';
import GiftAniMsg from './ChatBoxComponents/GiftAniMsg';

const UnreadMessages = () => {
    const {state, dispatch} = useContext(SocketContext);
    const {unreadMessages} = state;

    const handleAnimationEnd = (index) => {
        dispatch({
            type: 'SET_UNREAD_MESSAGES',
            payload: unreadMessages.filter((_, i) => i !== index),
        });
    }

    return (
        <>
            {unreadMessages.map((msg, index) => (
                msg.gift ? (
                    <div key={index}
                         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg py-2 px-4 rounded-md whitespace-nowrap"
                         onAnimationEnd={() => handleAnimationEnd(index)}>
                        {/*<strong>{msg.user}</strong>*/}
                        <GiftAniMsg msg={msg}/>
                    </div>

                ) : (
                    <div key={index}
                         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg bg-black bg-opacity-50 text-white py-2 px-4 rounded-md whitespace-nowrap"
                         onAnimationEnd={() => handleAnimationEnd(index)}>
                        <strong>{msg.user}</strong>: {msg.message}
                    </div>
                )
            ))}
        </>
    );
};

export default UnreadMessages;

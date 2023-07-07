// src/components/UnreadMessages.js
import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';
import GiftMessage from "./GiftMessage";

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
                    <GiftMessage message={msg} key={index}/>
                ) : (
                    <div key={index}
                         className="absolute left-full top-1/2 animate-move-left text-lg bg-black bg-opacity-50 text-white py-2 px-4 rounded-md whitespace-nowrap"
                         onAnimationEnd={() => handleAnimationEnd(index)}>
                        <strong>{msg.user}</strong>: {msg.message}
                    </div>
                )
            ))}
        </>
    );
};

export default UnreadMessages;

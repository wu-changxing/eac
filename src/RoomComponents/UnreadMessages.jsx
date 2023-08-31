import React, { useEffect, useState } from 'react';
import GiftAniMsg from './ChatBoxComponents/GiftAniMsg';
import useRoomStore from "../useRoomStore";
import './Danmuka.css';  // Import the Danmuka.css file

const UnreadMessages = () => {
    const { unreadMessages, removeUnreadMessage } = useRoomStore((state) => ({
        unreadMessages: state.unreadMessages,
        removeUnreadMessage: state.removeUnreadMessage
    }));

    const [offsets, setOffsets] = useState({});

    useEffect(() => {
        let newOffsets = {};
        let yOffset = 0;

        unreadMessages.forEach((msg, index) => {
            if (!msg.gift) {
                newOffsets[index] = yOffset;
                yOffset += 40; // Increase offset by 40 pixels for each message. Change this value as needed
            }
        });

        setOffsets(newOffsets);
    }, [unreadMessages]);

    const handleAnimationEnd = (index) => {
        removeUnreadMessage(index);
    };

    return (
        <div className="absolute inset-0">
            {unreadMessages.map((msg, index) => (
                msg.gift ? (
                    <div
                        key={index}
                        className="absolute lg:left-1/3 top-1/4 text-lg py-2 px-4 rounded-full lg:rounded-md whitespace-nowrap"
                        onAnimationEnd={() => handleAnimationEnd(index)}
                        style={{ zIndex: 1000 }}
                    >
                        <GiftAniMsg msg={msg} />
                    </div>

                ) : (
                    <div
                        key={index}
                        style={{ '--top': `${index * 30}px` }}
                        className="danmu-animation text-lg bg-black bg-opacity-50 text-white py-2 px-4 rounded-md whitespace-nowrap"
                        onAnimationEnd={() => handleAnimationEnd(index)}>
                        <strong>{msg.user}</strong>: {msg.message}
                    </div>
                )
            ))}
        </div>
    );
};

export default UnreadMessages;

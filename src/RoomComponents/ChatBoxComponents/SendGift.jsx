import React, { useEffect, useState } from 'react';
import UserList from "../RoomInfo/UserList";
import { FaTimes } from 'react-icons/fa';
import config from "../../config";
import GiftCard from "./GiftCard";

const SendGift = ({ socket, setMessages, roomId, users }) => {
    const [selectedGift, setSelectedGift] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [gifts, setGifts] = useState([]);
    const username = localStorage.getItem('username');

    const handleGiftSelect = async (id) => {
        setShowModal(true);
        console.log(selectedGift);
    };

    const handleUserSelect = (user) => {
        setShowModal(false);
        sendGiftMessage(user, selectedGift);
    };

    const sendGiftMessage = (user, gift) => {
        console.log("username and gift is", user, gift)
        if (socket) {
            const message = {
                user: 'You',
                gift,
                from: username,
                to: user,
                room_id: roomId,
            };
            console.log("send_gift is", message)
            socket.emit('send_gift', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            setSelectedGift(null);
            setSelectedUser(null);
        }
    };

    useEffect(() => {
        fetchGifts();
    }, []);

    const fetchGifts = async () => {
        const response = await fetch(`${config.BACKEND}/api/v2/gifts`);
        const data = await response.json();
        setGifts(data.items);
    };

    return (
        <>
            <div className="flex py-4 space-x-1 overflow-x-auto">
                {gifts.map((gift) => (
                    <div
                        key={gift.id}
                        className="flex rounded-lg bg-white shadow-md hover:shadow-xl cursor-pointer mr-4"
                        style={{ minWidth: '200px' }} // Set the minimum width here
                        onClick={() => handleGiftSelect(gift.id)}
                    >
                        <GiftCard id={gift.id} setSelectedGift={setSelectedGift} />
                    </div>
                ))}
            </div>

            {showModal && (
                <UserList users={users} clickHandler={handleUserSelect} setShowModal={setShowModal} />
            )}
        </>
    );
};

export default SendGift;

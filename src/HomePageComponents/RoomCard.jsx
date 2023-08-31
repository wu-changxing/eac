import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdPeople, IoIosTime } from 'react-icons/io';
import { MdRoofing } from 'react-icons/md';

const RoomCard = ({ room }) => {
    const navigate = useNavigate();

    const joinRoom = (roomId) => {
        navigate(`/eac/${roomId}`);
    };

    return (
        <div
            key={room.roomId}
            className="bg-white border-t-2 border-sky-500 shadow-xl rounded-lg overflow-hidden max-w-sm cursor-pointer transform hover:scale-105 transition-transform ease-in-out duration-150"
            onClick={() => joinRoom(room.roomId)}
        >
            <div className="p-4 space-y-2">
                <h5 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{room.name}</h5>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-2">
                    <IoMdPeople className="inline mr-2 text-sky-500"/>主理人: {room.admin}
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
                    <IoIosTime className="inline mr-2 text-sky-500"/>{room.created_at}
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
                    <MdRoofing className="inline mr-2 text-sky-500"/>{room.members.length} 人
                </p>
            </div>
        </div>
    );
};

export default RoomCard;



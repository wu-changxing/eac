// src/components/AdminControls.js
import React from 'react';
import {IoIosRemoveCircle} from "react-icons/io";
import {GiHighKick, GiHidden} from "react-icons/gi";
import {RiShutDownLine} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {useContext} from 'react';
import {SocketContext} from '../../SocketContext';
import useRoomStore from "../../useRoomStore";
import {BiHide} from "react-icons/bi";
import {FaPersonBooth} from "react-icons/fa";

const AdminControls = ({roomId, setShowModal, localStream, socket}) => {
    const isAdmin = useRoomStore(state => state.isAdmin);
    const isRoomHidden = useRoomStore(state => state.isRoomHidden);
    const roomName = useRoomStore(state => state.roomName); // get room name from Zustand store
    const setRoomName = useRoomStore(state => state.setRoomName); //
    const navigate = useNavigate();
    const level = localStorage.getItem("level");

    const dismissRoom = () => {
        socket.emit("dismiss_room", {room_id: roomId});
        navigate('/roomlists');
    };

    const handleHideRoom = () => {
        // Emit a socket event to hide the room
        socket.emit("hide_room", { room_id: roomId, hidden: !isRoomHidden })

    };

    return (
        <div className="flex items-end lg:space-x-3">
            <button
                className="flex items-center p-4 lg:p-2 font-semibold text-red-500 transition duration-500 ease-in-out transform bg-gray-50 rounded-lg hover:bg-red-700 hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                onClick={dismissRoom}
            >
                <RiShutDownLine className="mr-2"/>
                <span className="lg:inline hidden">Dismiss</span>
            </button>

            {level >= 4 && (
                <button
                    className={`flex items-center p-4 lg:p-2 font-semibold text-red-500 transition duration-500 ease-in-out transform bg-gray-50 rounded-lg ${
                        isRoomHidden ? 'hover:bg-green-600' : 'hover:bg-red-600'
                    } hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2`}
                    onClick={handleHideRoom}
                >
                    {isRoomHidden ? <BiHide className="mr-2" /> : <FaPersonBooth className="mr-2" />}
                    <span className="lg:inline hidden">{isRoomHidden ? 'Unhide' : 'Hide'}</span>
                </button>
            )}
            <button
                className="flex items-center p-4 lg:p-2 font-semibold text-red-500 transition duration-500 ease-in-out transform bg-gray-50 rounded-lg hover:bg-red-600 hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                onClick={() => setShowModal(true)}
            >
                <GiHighKick className="mr-2"/>
                <span className="lg:inline hidden">Kick</span>
            </button>

        </div>
    );
};

export default AdminControls;

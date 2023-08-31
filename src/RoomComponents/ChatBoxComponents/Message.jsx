import React, { useContext } from 'react';
import { AiTwotonePushpin, AiOutlineInfoCircle, AiOutlineUser } from "react-icons/ai";
import GiftMessage from "./GiftMessage";
import useRoomStore from '../../useRoomStore';
import {FaFileAlt, FaRegHeart, FaUserInjured} from "react-icons/fa";
import { SocketContext } from "../../SocketContext";
import {GiFeather} from "react-icons/gi";
import {ImUserTie} from "react-icons/im";

const Message = ({ key, message, messages, setMessages }) => {
    const { state } = useContext(SocketContext);
    const { socket } = state;
    const isAdmin = useRoomStore((state) => state.isAdmin);
    const roomId = useRoomStore((state) => state.roomId);

    const handleTogglePinMessage = () => {
        if (isAdmin) {
            if (message.isPinned) {
                socket.emit('unpin_message', { room_id: roomId, message: message.message });
            } else {
                socket.emit('pin_message', { room_id: roomId, message: message.message });
            }
        }
    };

    if (message.user === 'System') {
        return (
            <div className="bg-gray-200 text-gray-800 w-full text-center my-2 py-1 rounded-lg shadow-lg flex items-center justify-center">
                <AiOutlineInfoCircle className="mr-2 text-lg text-blue-600" />
                <span className="text-md font-semibold">{message.message}</span>
            </div>
        );
    }
    if (message.user === 'PIN') {
        return (
            <div className="flex items-center justify-center p-4 rounded-xl shadow-lg my-2 transform transition-transform hover:scale-105 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
                <AiTwotonePushpin className="text-white text-2xl mr-2 transform rotate-45" />
                <div className="flex flex-col items-center">
                    <span className="text-white text-xl font-semibold tracking-wide uppercase">固定消息</span>
                    <span className="text-white text-md font-light mt-1">{message.message}</span>
                </div>
            </div>
        );
    }


    return (
        <div className={`relative flex flex-col border-2 ${message.isPinned ? 'border-yellow-400' : 'border-sky-500'} gap-1 my-2 p-2 rounded-lg shadow-sm ${
            message.user === 'You' ? 'bg-sky-300 text-white ml-auto' : 'bg-white text-gray-500 mr-auto'
        }`}>
            {isAdmin && (
                <button
                    onClick={handleTogglePinMessage}
                    className="absolute top-0 right-0 mt-1 mr-1 z-10">
                    <AiTwotonePushpin
                        className={`${message.isPinned ? 'text-yellow-400' : 'text-sky-500'} text-lg rounded-full p-1 hover:bg-sky-600`} />
                </button>
            )}
            <span className="text-sm font-bold text-sky-500 flex items-center">
        {message.user === 'You' ? <FaUserInjured className="mr-1 text-white" /> : <ImUserTie className="mr-1 text-gray-500" />}
                {message.user}
      </span>
            {message.message && <span className="text-slate-700 text-lg">{message.message}</span>}
            {message.gift && <GiftMessage message={message} />}
            {message.image && <img src={message.image} alt="sent content" className="max-w-full h-auto" />}
            {message.file && (
                <div className="flex items-center space-x-2 border-2 shadow-lg p-2 rounded-lg bg-white">
                    <FaFileAlt className="text-sky-500" />
                    <a
                        href={message.fileURL}
                        download={message.filename}
                        className="underline text-sky-500 hover:text-sky-600 overflow-hidden whitespace-wrap break-all"
                        style={{ maxWidth: '200px' }}
                    >
                        {message.filename}
                    </a>
                </div>
            )}
        </div>
    );
};

export default Message;

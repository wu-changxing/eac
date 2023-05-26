// src/Room.js
import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import StreamConnect from "./components/StreamConnect";
import useSocket from './components/useSocket';
import AdminRoomControl from "./components/AdminRoomControl";
import config from "./config";

const Room = ({onLogout}) => {
    const roomId = useParams().roomId;
    const socket = useSocket(config.SOCKET_HOST);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const username = localStorage.getItem('username');

    const backToRoomList = () => {
        navigate('/roomlists');
    };


    useEffect(() => {
        if (socket) {
            console.log('room created: and socket is: ', socket);
            socket.emit('list_rooms');
            socket.on('room_created', (data) => {
                setIsAdmin(data.is_admin);

                console.log('after set is admin in room:', isAdmin);
            });
            socket.on('rooms', (data) => {
                console.log('-------------Room list retrieved:', data.rooms);
                // setRooms(data.rooms);
            });
            socket.emit('is_room_admin', {
                room_id: roomId,
                username: username,
            });
            socket.on('is_admin', (data) => {
                console.log('Room admin:', data);
                setIsAdmin(data.is_admin);
                console.log('after set is admin in room:', isAdmin);
                console.log('isAdmin:', isAdmin);
            });
            socket.on('room_dismissed', (data) => {
                if (data.room_id === roomId) {
                    navigate('/roomlists');
                }
            });
            socket.on('you_kicked', (data) => {
                console.log('you are kicked from room:', data);
                if (data.user === username) {
                    navigate('/roomlists');
                }
            });

        }
    }, [socket]);


    return (
        <div className="room-container">

            <StreamConnect roomId={roomId} socket={socket} isAdmin={isAdmin}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={backToRoomList}>Back
            </button>
            {isAdmin && <AdminRoomControl roomId={roomId} socket={socket} />}
        </div>
    );
};

export default React.memo(Room);
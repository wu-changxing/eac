import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import StreamConnect from "./components/StreamConnect";
import useSocket from './components/useSocket';

const Room = ({onLogout}) => {
    const roomId = useParams().roomId;
    const socket = useSocket("http://localhost:8000");
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const username = localStorage.getItem('username');

    const backToRoomList = () => {
        navigate('/roomlists');
    };

    const dismissRoom = () => {
        if (isAdmin) {
            socket.emit('dismissRoom', roomId);
        }
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
                username:username,
            });
            socket.on('is_admin', (data) => {
                console.log('Room admin:', data);
                setIsAdmin(data.is_admin);
                console.log('after set is admin in room:', isAdmin);
                console.log('isAdmin:', isAdmin);
            });

        }
    }, [socket]);



    return (
        <div className="room-container">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={backToRoomList}>Back to Room List</button>
            {isAdmin && <button className="px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={dismissRoom}>Dismiss Room</button>}
            <StreamConnect roomId={roomId} socket={socket} isAdmin={isAdmin} />
        </div>
    );
};

export default React.memo(Room);
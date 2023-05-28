import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {SocketContext} from './SocketContext';
import CreateRoomModal from "./components/CreateRoomModal";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const {state: {socket}, loading} = useContext(SocketContext);
    const username = localStorage.getItem('username');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        console.log("socket is: ", socket)
        if (!socket) return;

        const handleRooms = (data) => {
            const roomsArray = Object.entries(data.rooms).map(([roomId, roomDetails]) => ({
                roomId,
                ...roomDetails,
            }));
            setRooms(roomsArray);
        };

        socket.emit('list_rooms');
        socket.on('rooms', handleRooms);
        socket.on('connect_error', error => console.log('Connection error happened:', error));
        socket.on('disconnect', reason => console.log('Disconnected:', reason));

        return () => {
            socket.off('rooms', handleRooms);
            socket.off('connect_error');
        };
    }, [socket]);

    const createRoom = () => setModalOpen(true);

    const handleCreateRoom = (roomName) => {
        console.log("after click handle room the  socket is: ", socket)
        if (!socket || !roomName) return;

        socket.emit('create_room', {room_name: roomName, username});
        setModalOpen(false);
    };

    useEffect(() => {
        if (!socket) return;

        const handleRoomCreated = (data) => {
            setRooms((prevRooms) => [...prevRooms, {...data}]);
            joinRoom(data.room_id);
        };

        socket.on('room_created', handleRoomCreated);

        return () => {
            socket.off('room_created', handleRoomCreated);
        };
    }, [socket]);

    const joinRoom = (roomId) => navigate(`/eac/${roomId}`);
    if (loading) {
        return <div>Loading...</div>; // Replace with your own loading spinner
    }

    return (
        <div className="p-4 text-5xl lg:text-lg">
            <h1 className="font-bold text-2xl mb-4">Room List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map(room => (
                    <div key={room.roomId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <h5 className="lg:text-lg text-5xl font-bold mb-2">{room.name}</h5>
                            <p className="lg:text-sm text-4xl text-gray-500 mb-2">主理人: {room.admin}</p>
                            <p className="lg:text-sm text-4xl text-gray-500"> {room.created_at}</p>
                        </div>
                        <div className="p-4 bg-gray-100">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => joinRoom(room.roomId)}>Join Room
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={createRoom}>Create Room
            </button>
            <CreateRoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateRoom}/>
        </div>
    );
};

export default RoomList;

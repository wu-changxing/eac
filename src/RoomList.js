import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';
import useSocket from './components/useSocket';
import CreateRoomModal from "./components/CreateRoomModal";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const socket = useSocket(config.BACKEND);
    const username = localStorage.getItem('username');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (socket) {
            socket.emit('list_rooms');

            socket.on('rooms', (data) => {
                const roomsArray = Object.entries(data.rooms).map(([roomId, roomDetails]) => ({
                    roomId,
                    ...roomDetails,
                }));
                setRooms(roomsArray);
            });

            socket.on('connect_error', (error) => {
                console.log('Connection error happened:', error);
            });

            socket.on('disconnect', (reason) => {
                console.log('Disconnected:', reason);
            });
        }
        return () => {
            if (socket) {
                socket.off('rooms');
                socket.off('connect_error');
                socket.off('disconnect');
            }
        };
    }, [socket]);

    const createRoom = () => {
        setModalOpen(true);
    };

    const handleCreateRoom = (roomName) => {
        if (roomName) {
            socket.emit('create_room', { room_name: roomName, username });
        }
        setModalOpen(false);
        socket.on('room_created', (data) => {
            setRooms((prevRooms) => [...prevRooms, { ...data }]);
            joinRoom(data.room_id);
        });
    };

    const joinRoom = (roomId) => {
        navigate(`/eac/${roomId}`);
    };

    return (
        <div className="p-4">
            <h1 className="font-bold text-2xl mb-4">Room List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map(room => (
                    <div key={room.roomId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <h5 className="text-lg font-bold mb-2">{room.name}</h5>
                            <p className="text-sm text-gray-500 mb-2">Created by: {room.admin}</p>
                            <p className="text-sm text-gray-500">Time: {room.created_at}</p>
                        </div>
                        <div className="p-4 bg-gray-100">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => joinRoom(room.roomId)}>Join Room</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={createRoom}>Create Room
            </button>
            <CreateRoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateRoom} />
        </div>
    );
};

export default RoomList;

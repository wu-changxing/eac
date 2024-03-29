import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {SocketContext} from './SocketContext';
import CreateRoomModal from "./HomePageComponents/CreateRoomModal";
import {IoIosAddCircle, IoMdPeople, IoIosTime,} from 'react-icons/io';
import Loading from "./components/Loading";
import Banner from './HomePageComponents/Banner';
import RoomCard from "./HomePageComponents/RoomCard"; // import Banner
const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const {state: {socket}, loading} = useContext(SocketContext);
    const username = localStorage.getItem('username');
    const [modalOpen, setModalOpen,] = useState(false);

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
        setModalOpen(false);
        if (!socket || !roomName) return;
        socket.emit('create_room', {room_name: roomName, username});

    };

    useEffect(() => {
        if (!socket) return;

        const handleRoomCreated = (data) => {
            setRooms((prevRooms) => [...prevRooms, {...data}]);
        };

        socket.on('room_created', handleRoomCreated);
        socket.on('your_room_id', (data) => {
            navigate(`/eac/${data.room_id}`)
        });

        return () => {
            socket.off('room_created', handleRoomCreated);
        };
    }, [socket]);



    if (loading) {
        return <div><Loading></Loading></div>; // Replace with your own loading spinner
    }
    return (
        <>
            <Banner />
            <div className="p-2 sm:p-4 text-xl sm:text-2xl lg:text-2xl lg:mt-20">
                <h1 className="font-bold text-xl sm:text-2xl lg:text-xl mb-4">Room List</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 gap-4">
                    {rooms
                        .filter(room => !room.hidden)
                        .map(room => (
                            <RoomCard key={room.roomId} room={room} />
                        ))}
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        className="bg-sky-500 hover:bg-sky-700 text-white font-bold w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 flex items-center justify-center rounded-full"
                        onClick={createRoom}
                    >
                        <IoIosAddCircle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"/>
                    </button>
                </div>
                <CreateRoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateRoom} />
            </div>
        </>
    );
};

export default RoomList;

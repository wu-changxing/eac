// src/Room.js
import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import useSocket from './components/useSocket';
import Streams from './RoomComponents/Streams';
import RoomControl from "./RoomComponents/RoomControl";
import config from "./config";
import { useContext } from 'react';
import { SocketContext } from './SocketContext';
import useLocalStream from './RoomComponents/useLocalStream';
import Dialog  from "./components/Dialog";
const Room = ({onLogout}) => {
    const roomId = useParams().roomId;
    const { state: socketState } = useContext(SocketContext);
    const socket = socketState.socket;
    const peer = socketState.peer;
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const username = localStorage.getItem('username');
    const { openVideo: initialOpenVideo, openAudio: initialOpenAudio } = location.state || { openVideo: false, openAudio: true };
    // rest of the useState declarations
    const [openVideo, setOpenVideo] = useState(initialOpenVideo);
    const [openAudio, setOpenAudio] = useState(initialOpenAudio);
    // rest of the code
    const { localStream, isStreamReady } = useLocalStream(openVideo, openAudio);
    const backToRoomList = () => {
        setIsAdmin(false);
        navigate('/roomlists');
    };


    useEffect(() => {
        if (socket && peer) {
            console.log('room created: and socket is: ', socket);
            socket.emit('list_rooms');
            socket.emit('join_room', {room_id: roomId, username: username, peer_id: peer.id});
            socket.on('room_created', (data) => {
                setIsAdmin(data.is_admin);

                console.log('after set is admin in room:', isAdmin);
            });
            socket.on('rooms', (data) => {
                // console.log('-------------Room list retrieved:', data.rooms);
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
    }, [socket,roomId,peer]);


    return (
        <div className="room-container">
            <Streams roomId={roomId} socket={socket} isAdmin={isAdmin} localStream={localStream} isStreamReady={isStreamReady}/>

            <div className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-md flex justify-around items-center">
                <RoomControl roomId={roomId} socket={socket} isAdmin={isAdmin} localStream={localStream} openVideo={openVideo} setOpenVideo={setOpenVideo} />
            </div>
        </div>
    );
};

export default React.memo(Room);
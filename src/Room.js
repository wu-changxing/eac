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
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the icons
import {GiArtificialIntelligence, GiBrain} from 'react-icons/gi'; // Import the AI icon
import AIChatToggle from './RoomComponents/AIChatToggle';
import FeedList from './RoomComponents/FeedList';
import RoomToolsBar from './RoomComponents/RoomToolsBar';
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
    const [users, setUsers] = useState([]);

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
    useEffect(() => {
        // Other socket event handlers

        const handleRoomUsers = (data) => {
            console.log("room_users:", data);
            if (data.users) {
                console.log("data.users is an array:", data.users);
                setUsers(Object.values(data.users));
            } else {
                console.error("data.users is not an array:", data.users);
            }
        };

        let intervalId;

        if (socket) {
            socket.on('update_users', handleRoomUsers);

            intervalId = setInterval(() => {
                socket.emit("fetch_users", {room_id: roomId});
            }, 5000); // Every 5 seconds

            return () => {
                clearInterval(intervalId); // Clear the interval when component unmounts
                socket.removeListener("update_users", handleRoomUsers);
            };
        }
    }, [socket,isAdmin, roomId]);



    // src/Room.js
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow flex flex-col md:flex-row overflow-auto">
                <div className="flex-grow lg:w-1/4">
                    <Streams roomId={roomId} socket={socket} isAdmin={isAdmin} localStream={localStream} isStreamReady={isStreamReady}/>
                </div>
                <div className="w-full lg:w-3/4">
                    <RoomToolsBar users ={users} />
                </div>
            </div>
            <div className="bg-white p-4 shadow-md flex justify-around items-center">
                <RoomControl roomId={roomId} socket={socket} isAdmin={isAdmin} localStream={localStream} openVideo={openVideo} setOpenVideo={setOpenVideo} users={users} />

            </div>
        </div>
    );

};

export default React.memo(Room);
// src/Room.js
import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Streams from './RoomComponents/StreamCards/Streams';
import config from "./config";
import {useContext} from 'react';
import {SocketContext} from './SocketContext';
import useLocalStream from './RoomComponents/StreamCards/useLocalStream';
import RoomToolsBar from './RoomComponents/RoomToolsBar';
import useRoomStore from './useRoomStore';
import UnreadMessages from "./RoomComponents/UnreadMessages";

const Room = ({onLogout}) => {
    const roomId = useParams().roomId;
    const {state: socketState} = useContext(SocketContext);
    const socket = socketState.socket;
    const peer = socketState.peer;
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const {openVideo: initialOpenVideo, openAudio: initialOpenAudio} = location.state || {
        openVideo: false,
        openAudio: true
    };
    // rest of the useState declarations
    const [openVideo, setOpenVideo] = useState(initialOpenVideo);
    const [openAudio, setOpenAudio] = useState(initialOpenAudio);
    // rest of the code
    const {localStream, isStreamReady} = useLocalStream(openVideo, openAudio);
    const { isAdmin, setIsAdmin, isRoomHidden, setIsRoomHidden, users, setUsers, setRoomId , roomName, setRoomName } = useRoomStore();

    const {
        unreadMessages,
        showChatBox,      // Added from Zustand
        setShowChatBox,   // Added from Zustand
        setUnreadMessages,
    } = useRoomStore();
    const backToRoomList = () => {
        setIsAdmin(false);
        navigate('/roomlists');
    };


    useEffect(() => {
        setRoomId(roomId);
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
            socket.on('room_hidden', (data) => {
                if (data.room_id === roomId) {
                    setIsRoomHidden(data.hidden);
                }
            });
            socket.on('is_admin', (data) => {
                console.log('Room admin:', data);
                setIsAdmin(data.is_admin);
                setRoomName(data.room_name)
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
    }, [socket, roomId, peer]);
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

        let timeoutId;

        if (socket) {
            socket.on('update_users', handleRoomUsers);

            timeoutId = setTimeout(() => {
                socket.emit("fetch_users", {room_id: roomId});
            }, 2000); // After 5 seconds

            return () => {
                clearTimeout(timeoutId); // Clear the timeout when component unmounts
                socket.removeListener("update_users", handleRoomUsers);
            };
        }
    }, [socket, isAdmin, roomId]);


    // src/Room.js
    return (
        <div className="relative flex flex-col h-screen">
            {!showChatBox && <UnreadMessages/>}
            <div className="flex-grow flex flex-col md:flex-row overflow-auto">
                {/*<div>random </div>*/}

                <div className="flex-grow lg:w-1/4">
                    <Streams roomId={roomId} socket={socket} isAdmin={isAdmin} localStream={localStream}
                             isStreamReady={isStreamReady}/>
                </div>
                <div className="w-full lg:w-3/4">
                    <RoomToolsBar users={users} localStream={localStream}
                                  openVideo={openVideo} setOpenVideo={setOpenVideo}/>
                </div>
            </div>
        </div>
    );

};

export default React.memo(Room);
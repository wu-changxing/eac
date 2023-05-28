// src/components/StreamConnect.js
import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from '../SocketContext';
import Video from "./Video";
import useStream from './useStream';

const StreamConnect = ({roomId}) => {
    const [streams, setStreams] = useState([]);
    const { state: socketState } = useContext(SocketContext);
    const { socket, peer: peerRef } = socketState;
    const username = localStorage.getItem("username");
    const {stream, isStreamReady} = useStream(true, true);

    const addVideoStream = (stream, userLabel, isLocal) => {
        setStreams(prevStreams => {
            if(prevStreams.some(s => s.userLabel === userLabel)) {
                console.log("Stream already exists for user", userLabel);
                return prevStreams;
            }
            console.log("Adding video stream", userLabel);
            return [...prevStreams, {stream, userLabel, isLocal}];
        });
    };

    useEffect(() => {
        if (peerRef && isStreamReady) {
            addVideoStream(stream, username, true);
            const handleIncomingCall = incomingCall => {
                //exist user will answer every call it received and add the stream to the streams array
                console.log("Receiving call exist user will answer every call it received and add the stream to the streams array", incomingCall)
                incomingCall.answer(stream);
                const {username: remoteUsername, peer_id: remotePeerId} = incomingCall.metadata;
                addVideoStream(incomingCall.stream, remoteUsername || "Unknown", false);
            };
            peerRef.on("call", handleIncomingCall);
            return () => peerRef.removeListener("call", handleIncomingCall);
        }
    }, [peerRef, isStreamReady, stream, username]);

    useEffect(() => {
        if (peerRef && isStreamReady) {
            const handleRoomUsers = ({users}) => {
                console.log("get room users and start calling", users)
                Object.values(users).forEach(user => {
                    console.log("Calling user", user);
                    if (user.peer_id === peerRef.id) return;
                    const call = peerRef.call(user.peer_id, stream, {metadata: {username}});
                    console.log("Calling user", user);

                    // call.on("stream", remoteStream => addVideoStream(remoteStream, user.username, false));
                });
            };

            socket.on("update_users", (data) => {
                console.log("get room users and start calling", data)
                handleRoomUsers(data);
            });
            socket.on("user_joined", (data) => {
                console.log("--- NEW User joined", data);
            });
            return () => socket.removeListener("update_users", handleRoomUsers);
        }
    }, [peerRef, isStreamReady, stream, username, socket]);

    useEffect(() => {
        if (socket) {
            const handleUserKicked = ({user}) => {
                setStreams(streams => streams.filter(s => s.userLabel !== user));
                if (user === username) {
                    console.log("User kicked", user);
                    peerRef.disconnect();
                    // Navigate back to the room list
                    // navigate('/roomlists');
                }
            };
            // socket.emit('fetch_users', {room_id: roomId})
            socket.on('user_kicked', handleUserKicked);
            return () => socket.removeListener('user_kicked', handleUserKicked);
        }
    }, [socket, username, peerRef]);

    return (
        <div className="p-4">
            <h1 className="font-bold  mb-4">Users Connected</h1>
            <div className="grid sm:grid-col-1 md:grid-col-2  lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {streams.map((s, index) => (
                    <div key={s.userLabel} className="p-6 bg-white rounded-lg shadow-md">
                        <div className="text-lg font-semibold mb-2 text-gray-700">{index}</div>
                        <Video stream={s.stream} userLabel={s.userLabel} isLocal={s.isLocal}/>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default React.memo(StreamConnect);

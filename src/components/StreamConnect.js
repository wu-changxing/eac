// src/components/StreamConnect.js
import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from '../SocketContext';
import Video from "./Video";
import useStream from './useStream';

const StreamConnect = ({roomId, localStream, isStreamReady}) => {
    const [streams, setStreams] = useState([]);
    const { state: socketState } = useContext(SocketContext);
    const { socket, peer: peerRef } = socketState;
    const username = localStorage.getItem("username");

    useEffect(() => {
        if (socket) {
            const handleUserLeft = ({ username }) => {
                setStreams(streams => streams.filter(s => s.userLabel !== username));
                console.log("User left", username);
            };
            socket.on('user_left', handleUserLeft);
            return () => socket.removeListener('user_left', handleUserLeft);
        }
    }, [socket]);

    const addVideoStream = (livestream, userLabel, isLocal) => {
        setStreams(prevStreams => {
            const otherStreams = prevStreams.filter(s => s.userLabel !== userLabel);
            if(prevStreams.some(s => s.userLabel === userLabel)) {
                console.log("Stream already exists for user", userLabel, "Replacing with new stream.");
            } else {
                console.log("Adding video stream", userLabel, livestream);
            }
            return [...otherStreams, {livestream, userLabel, isLocal}];
        });
    };


    useEffect(() => {
        console.log("StreamConnect: useEffect: peerRef", localStream,isStreamReady)
        if (peerRef && localStream) {

            addVideoStream(localStream, username, true);
            const handleIncomingCall = incomingCall => {
                console.log("Receiving call exist user will answer every call it received and add the stream to the streams array", incomingCall)
                incomingCall.answer(localStream);

                incomingCall.on('stream', remoteStream => {
                    const {username: remoteUsername} = incomingCall.metadata;
                    addVideoStream(remoteStream, remoteUsername || "Unknown", false);
                });
            };

            peerRef.on("call", handleIncomingCall);

            return () => peerRef.removeListener("call", handleIncomingCall);
        }
    }, [peerRef, isStreamReady, localStream, username]);

    useEffect(() => {
        if (peerRef && isStreamReady) {
            const handleRoomUsers = ({users}) => {
                console.log("get room users and start to handle room users", users)
                Object.values(users).forEach(user => {
                    console.log("handle user", user.user)
                    if (user.peer_id === peerRef.id) return;
                    if (user.user === username) return;
                    const stream = localStream; // rename localStream to stream
                    const call = peerRef.call(user.peer_id, stream, {metadata: {username}});
                    console.log("Calling user", user.user);
                    console.log("StreamConnect: useEffect: peerRef", localStream,isStreamReady,peerRef)
                    call.on("stream", remoteStream => addVideoStream(remoteStream, user.user, false));
                });
            };

            socket.on("exist_users", (data) => {
                handleRoomUsers(data);
            });
            socket.on("user_joined", (data) => {
                // console.log("--- NEW User joined", data);
                // you can add a notification here
                // callNewUser(data.new_user);
            });
            return () => socket.removeListener("update_users", handleRoomUsers);
        }
    }, [peerRef, isStreamReady, localStream, username, socket]);

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
                        <Video stream={s.livestream} userLabel={s.userLabel} isLocal={s.isLocal}/>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default React.memo(StreamConnect);

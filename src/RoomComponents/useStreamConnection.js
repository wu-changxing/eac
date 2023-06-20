// src/RoomComponents/useStreamConnection.js
import { useState, useEffect, useContext } from "react";
import { SocketContext } from '../SocketContext';

const useStreamConnection = ({ roomId, localStream, isStreamReady }) => {
    const [streams, setStreams] = useState([]);
    const { state: socketState } = useContext(SocketContext);
    const { socket, peer: peerRef } = socketState;
    const username = localStorage.getItem("username");
    const [newUser, setNewUser] = useState(null);

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
        if (socket) {
            const handleUserLeft = ({ user }) => {
                setStreams(streams => streams.filter(s => s.userLabel !== user));
                console.log("User left", username);
            };

            socket.on('user_left', handleUserLeft);
            socket.on('user_kicked', handleUserLeft);
            socket.on('user_joined', (data) => {
                console.log("user joined", data)
                setNewUser(data.new_user);
                if (peerRef && localStream && isStreamReady) {
                    if (data.new_user.peer_id === peerRef.id) return;
                    if (data.new_user.username === username) return;
                    const stream = localStream; // rename localStream to stream
                    const call = peerRef.call(data.new_user.peer_id, stream, {metadata: {username}});
                    console.log("Calling user", data.new_user);
                    console.log("StreamConnect: useEffect: peerRef", localStream, isStreamReady, peerRef)
                    call.on("stream", remoteStream => addVideoStream(remoteStream, data.new_user.username, false));
                }
            });

            return () => socket.removeListener('user_left', handleUserLeft);
        }
    }, [socket]);

    useEffect(() => {
        if (newUser && peerRef && localStream && isStreamReady) {
            if (newUser.peer_id === peerRef.id) return;
            if (newUser.username === username) return;
            const stream = localStream; // rename localStream to stream
            const call = peerRef.call(newUser.peer_id, stream, {metadata: {username}});
            console.log("Calling user", newUser);
            console.log("StreamConnect: useEffect: peerRef", localStream, isStreamReady, peerRef)
            call.on("stream", remoteStream => addVideoStream(remoteStream,newUser.username, false));
        }
    }, [newUser]);

    useEffect(() => {
        console.log("StreamConnect: useEffect: peerRef", localStream,isStreamReady)
        if (peerRef && localStream) {

            socket.emit('join_room', {room_id: roomId, username: username, peer_id: peerRef.id})
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

    return [streams, setStreams];
};

export default useStreamConnection;

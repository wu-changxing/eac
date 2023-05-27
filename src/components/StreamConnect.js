// src/components/StreamConnect.js
import React, {useState, useEffect, useRef} from "react";
import Video from "./Video";
import useStream from './useStream';
import usePeer from './usePeer';

const StreamConnect = ({roomId, socket}) => {
    const [users, setUsers] = useState([]);
    const [streams, setStreams] = useState([]);
    const [connectedPeers, setConnectedPeers] = useState(new Set());
    const [connectedUsers, setConnectedUsers] = useState(new Set());

    const username = localStorage.getItem("username");
    const {stream, isStreamReady} = useStream(true, true);
    const {peer: peerRef, local_peer_id, peerIsReady} = usePeer(socket);

    const addVideoStream = (stream, userLabel, peerId, localConnectedUsers, isLocal) => {
        console.log("adding video stream", userLabel);
        console.log("this is loclal or not", isLocal)
        if (!localConnectedUsers.has(userLabel)) {
            localConnectedUsers.add(userLabel);
            console.log("adding video stream", userLabel, peerId)
            userLabel = userLabel;
            setStreams((prevStreams) => [...prevStreams, {stream, userLabel, isLocal}]);
        } else {
            console.log("Stream already exists for user", userLabel);
        }
        return localConnectedUsers;
    };

    useEffect(() => {
        if (peerIsReady && isStreamReady) {
            let localConnectedUsers = new Set(connectedUsers);
            //local stream

            localConnectedUsers = addVideoStream(stream, username, local_peer_id, localConnectedUsers, true);

            // remote streams
            console.log("setting up peer call listener...")
            const handleIncomingCall = (incomingCall) => {
                // this is wait for the other users call to myself
                incomingCall.answer(stream);
                // incomingCall.on("stream", (remoteStream) => {
                //     console.log("useEffect incoming call on stream, going to add stream");
                //     const remoteUsername = incomingCall.metadata ? incomingCall.metadata.username : "Unknown";
                //     const remotePeerId = incomingCall.metadata ? incomingCall.metadata.peer_id : "Unknown";
                //     localConnectedUsers = addVideoStream(remoteStream, remoteUsername, remotePeerId, localConnectedUsers);
                //     console.log("adding video stream", remoteUsername)
                // });
            };
            peerRef.current.on("call", handleIncomingCall);
            setConnectedUsers(localConnectedUsers);
            return () => {
                // Clean up event listener when component unmounts or before a re-render happens
                peerRef.current.removeListener("call", handleIncomingCall);
            };

        }
    }, [peerIsReady, isStreamReady]);

    useEffect(() => {
        console.log("useEffect connectedUsers", connectedUsers)
        console.log("peer and stream ready?", peerIsReady, isStreamReady)
        if (peerIsReady && isStreamReady) {
            console.log("setting up peer call listener...")
            let localConnectedUsers = new Set(connectedUsers);
            const handleRoomUsers = (data) => {
                // for loop to call each user
                for (let key in data.users) {
                    let user = data.users[key];
                    if (user.peer_id !== local_peer_id) {
                        console.log("calling user", user.username);
                        const call = peerRef.current.call(user.peer_id, stream, {
                            metadata: {username: username, peer_id: local_peer_id},
                        });
                        call.on("stream", (remoteStream) => {
                            console.log("useEffect call on stream, going to add stream",);
                            localConnectedUsers = addVideoStream(remoteStream, user.user, user.peer_id, localConnectedUsers, false);

                        });
                    }
                }
            };
            socket.on("room_users", handleRoomUsers);
            setConnectedUsers(localConnectedUsers);
            return () => {
                // Clean up event listener when component unmounts or before a re-render happens
                socket.removeListener("room_users", handleRoomUsers);
            };
        }
    }, [peerIsReady, isStreamReady]);

    useEffect(() => {
        if (socket) {
            socket.on('user_kicked', (data) => {
                setStreams(streams => streams.filter(s => s.userLabel !== `${username}`));
                if (data.user === username) {
                    console.log("user kicked", data.user);
                    // Close the PeerJS connection
                    peerRef.current.disconnect();

                    // Remove the user's stream from the streams state

                    // Optionally, navigate back to the room list
                    // navigate('/roomlists');
                }
            });
        }
    }, [socket, username, peerRef, local_peer_id]);

    return (
        <div className="p-4">
            <h1 className="font-bold text-2xl mb-4">Stream Connect</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

            {streams.map((s, index) => (
                    <div key={s.userLabel}>
                        <div className="text-sm font-semibold mb-2 text-gray-200">{index}</div>
                        <Video stream={s.stream} userLabel={s.userLabel} isLocal={s.isLocal}/>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default React.memo(StreamConnect);

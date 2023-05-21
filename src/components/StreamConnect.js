// StreamConnect.js
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
    const {peer, local_peer_id, peerIsReady} = usePeer(socket);

    const addVideoStream = (stream, userLabel, peerId, localConnectedUsers) => {
        console.log("adding video stream", userLabel);
        if (!localConnectedUsers.has(userLabel)) {
            localConnectedUsers.add(userLabel);
            console.log("adding video stream", userLabel, peerId)
            userLabel = userLabel + peerId;
            setStreams((prevStreams) => [...prevStreams, {stream, userLabel}]);
        } else {
            console.log("Stream already exists for user", userLabel);
        }
        return localConnectedUsers;
    };

    useEffect(() => {
        if (peerIsReady && isStreamReady) {
            let localConnectedUsers = new Set(connectedUsers);
            //local stream
            localConnectedUsers = addVideoStream(stream, username, local_peer_id, localConnectedUsers)

            // remote streams
            console.log("setting up peer call listener...")
            const handleIncomingCall = (incomingCall) => {
                // this is wait for the other users call to myself
                incomingCall.answer(stream);
                incomingCall.on("stream", (remoteStream) => {
                    console.log("useEffect incoming call on stream, going to add stream");
                    const remoteUsername = incomingCall.metadata ? incomingCall.metadata.username : "Unknown";
                    const remotePeerId = incomingCall.metadata ? incomingCall.metadata.peer_id : "Unknown";
                    localConnectedUsers = addVideoStream(remoteStream, remoteUsername, remotePeerId, localConnectedUsers);
                    console.log("adding video stream", remoteUsername)
                });
            };
            peer.on("call", handleIncomingCall);
            setConnectedUsers(localConnectedUsers);
            return () => {
                // Clean up event listener when component unmounts or before a re-render happens
                peer.removeListener("call", handleIncomingCall);
            };

        }
    }, [peerIsReady, isStreamReady]);

    useEffect(() => {
        if (peerIsReady && isStreamReady) {
            let localConnectedUsers = new Set(connectedUsers);
            const handleRoomUsers = (data) => {
                // for loop to call each user
                for (let key in data.users) {
                    let user = data.users[key];
                    if (user.peer_id !== local_peer_id) {
                        console.log("calling user", user.username);
                        const call = peer.call(user.peer_id, stream, {
                            metadata: {username: username, peer_id: local_peer_id},
                        });
                        call.on("stream", (remoteStream) => {
                            console.log("useEffect call on stream, going to add stream",);
                            localConnectedUsers = addVideoStream(remoteStream, user.user, user.peer_id, localConnectedUsers);

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

    return (
        <div className="p-4">
            <h1 className="font-bold text-2xl mb-4">Stream Connect</h1>
            <div className="grid grid-cols-2 gap-4">
                {streams.map((s, index) => (
                    <div key={s.userLabel}>
                        <div className="text-lg font-semibold mb-2">{index}</div>
                        <Video
                            stream={s.stream}
                            userLabel={s.userLabel}
                        />
                    </div>
                ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => {
                if (stream) {
                    stream.getAudioTracks().forEach((track) => {
                        track.enabled = !track.enabled;
                    });
                }
            }}>Toggle Mute
            </button>
        </div>
    );



};

export default React.memo(StreamConnect);

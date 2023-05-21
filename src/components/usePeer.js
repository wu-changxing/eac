// usePeer.js
import {useEffect, useState, useRef,} from 'react';
import Peer from 'peerjs';
import {useParams} from 'react-router-dom';

const usePeer = (socket) => {
    const [peer, setPeer] = useState(null);
    const [local_peer_id, setLocalPeerId] = useState(null);
    const [isLocalStreamReady, setIsLocalStreamReady] = useState(false);
    const userStream = useRef(null);
    const roomId = useParams().roomId;
    const username = localStorage.getItem("username");
    const [peerIsReady, setPeerIsReady] = useState(false);


    const initializePeer = async (socket) => {
        const peer = new Peer(undefined, {
            host: "localhost",
            port: 9000,
            path: "/",
        });

        peer.on("open", (id) => {
            setLocalPeerId(id);

            setPeerIsReady(true);
            socket.emit("join_room", {
                room_id: roomId,
                username: username,
                peer_id: id,
            });
        });
        setPeer(peer);
    };

    useEffect(() => {
        if (socket && !peer) {
            initializePeer(socket).catch(error => {
                console.error("Error initializing peer: ", error);
            });
        }
        return () => {
            // Clean up here.
            if (peer) {
                peer.disconnect();
            }
        }
    }, [socket]);

    return {peer, local_peer_id, peerIsReady};
};

export default usePeer;

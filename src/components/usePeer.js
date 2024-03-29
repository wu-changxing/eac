// src/components/usePeer.js
import { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';
import config from '../config';

const usePeer = (socket) => {
    const peerRef = useRef(null);
    const [local_peer_id, setLocalPeerId] = useState(null);
    const [peerIsReady, setPeerIsReady] = useState(false);
    const roomId = useParams().roomId;
    const username = localStorage.getItem("username");

    const initializePeer = async (socket) => {
        peerRef.current = new Peer(undefined, {
            host: config.PEER_HOST,
            path: "/eacroom",
            secure: true, // Set secure to true
        });
        console.log("peerRef.current:", peerRef.current);

        peerRef.current.on("open", (id) => {
            console.log("peer is ready:", id)
            setLocalPeerId(id);
            setPeerIsReady(true);
            console.log("peer is ready:", id);
            socket.emit("join_room", {
                room_id: roomId,
                username: username,
                peer_id: id,
            });
        });
    };

    useEffect(() => {
        if (socket && !peerRef.current) {
            initializePeer(socket).catch(error => {
                console.error("Error initializing peer: ", error);
            });
        }
        return () => {
            // Clean up here.
            if (peerRef.current) {
                peerRef.current.disconnect();
            }
        }
    }, [socket]);

    return {peer: peerRef, local_peer_id, peerIsReady};
};

export default usePeer;

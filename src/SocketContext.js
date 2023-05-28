import React, { createContext, useReducer, useEffect,useState } from "react";
import io from 'socket.io-client';
import Peer from 'peerjs';
import config from "./config";

export const SocketContext = createContext();

const initialState = {
    socket: null,
    peer: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SOCKET":
            return {
                ...state,
                socket: action.payload,
            };
        case "SET_PEER":
            return {
                ...state,
                peer: action.payload,
            };
        case "CLEAR_SOCKET":
            return {
                ...state,
                socket: null,
            };
        case "CLEAR_PEER":
            return {
                ...state,
                peer: null,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
export const SocketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {

        const socketIo = io(config.SOCKET_HOST, {
            auth: {
                token: `${localStorage.getItem("token")}`,
            },

        });
        console.log("socketIo is: ", socketIo)

        socketIo.on("connect", () => {
            console.log("Connected to Socket.IO server");
            dispatch({ type: "SET_SOCKET", payload: socketIo }); // Dispatch the SET_SOCKET action

            const peer = new Peer(undefined, {
                host: config.PEER_HOST,
                path: "/eacroom",
                secure: true, // Set secure to true
            });

            peer.on("open", (id) => {
                console.log("peer is ready:", id);
                dispatch({ type: "SET_PEER", payload: peer }); // Dispatch the SET_PEER action
                setLoading(false); // The socket and peer connections are now ready
            });
        });

        return () => {
            if (socketIo) {
                 console.log('Socket disconnecting...');
                socketIo.disconnect();
                dispatch({ type: "CLEAR_SOCKET" }); // Dispatch the CLEAR_SOCKET action
            }
            if (state.peer) {
                 console.log('Peer disconnecting...');
                state.peer.disconnect();
                dispatch({ type: "CLEAR_PEER" }); // Dispatch the CLEAR_PEER action
            }
        };
    }, [dispatch]); // Add dispatch to the dependency array

    // Include loading in the context value
    return (
        <SocketContext.Provider value={{ state, dispatch, loading }}>
            {children}
        </SocketContext.Provider>
    );
};

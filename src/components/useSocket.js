import { useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { SocketContext } from '../SocketContext'; // Import the context
import config from "../config";

const useSocket = () => {
    const hasMounted = useRef(false);
    const { dispatch } = useContext(SocketContext); // Access dispatch

    useEffect(() => {
        hasMounted.current = true;
        return () => {
            hasMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (hasMounted.current) {
            const socketIo = io(config.SOCKET_HOST, {
                auth: {
                    token: `${localStorage.getItem("token")}`,
                },
            });

            socketIo.on("connect", () => {
                console.log("Connected to Socket.IO server");
                dispatch({ type: "SET_SOCKET", payload: socketIo }); // Dispatch the SET_SOCKET action
            });

            return () => {
                if (socketIo) {
                    socketIo.disconnect();
                    dispatch({ type: "CLEAR_SOCKET" }); // Dispatch the CLEAR_SOCKET action
                }
            };
        }
    }, [url, hasMounted, dispatch]); // Add dispatch to the dependency array

    return;
};

export default useSocket;

// useSocket.js
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const hasMounted = useRef(false);

    useEffect(() => {
        hasMounted.current = true;
        return () => {
            hasMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (hasMounted.current) {
            const socketIo = io(url, {
                auth: {
                    token: `${localStorage.getItem("token")}`,
                },
            });

            socketIo.on("connect", () => {
                console.log("Connected to Socket.IO server");
                setSocket(socketIo);
            });

            return () => {
                if (socketIo) {
                    socketIo.disconnect();
                }
            };
        }
    }, [url, hasMounted]);

    return socket;
};

export default useSocket;

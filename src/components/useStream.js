// useStream.js
import { useState, useEffect } from 'react';

const useStream = (video = true, audio = true) => {
    const [stream, setStream] = useState(null);
    const [isStreamReady, setIsStreamReady] = useState(false);

    useEffect(() => {
        const initializeStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video, audio });
                setStream(mediaStream);
                setIsStreamReady(true);
            } catch (error) {
                console.error('Error initializing stream:', error);
            }
        };

        initializeStream();
    }, [video, audio]);

    return { stream, isStreamReady };
};

export default useStream;

// src/components/useStream.js
import { useState, useEffect } from 'react';

const useStream = (video = true, audio = true, videoWidth = 640, videoHeight = 480) => {
    const [stream, setStream] = useState(null);
    const [isStreamReady, setIsStreamReady] = useState(false);

    useEffect(() => {
        const initializeStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    // video: video ? {
                    //     echoCancellation: true,
                    //     width: videoWidth,
                    //     height: videoHeight,
                    // } : false,
                    video:video,
                    audio:audio,
                });
                setStream(mediaStream);
                setIsStreamReady(true);
            } catch (error) {
                console.error('Error initializing stream:', error);
            }
        };

        initializeStream();
    }, [video, audio, videoWidth, videoHeight]);

    return { stream, isStreamReady };
};

export default useStream;

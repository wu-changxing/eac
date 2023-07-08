// src/components/useLocalStream.js
import { useState, useEffect } from 'react';

const useLocalStream = (video = false, audio = true, videoWidth = 640, videoHeight = 480) => {
    const [localStream, setStream] = useState(null);
    const [isStreamReady, setIsStreamReady] = useState(false);
    console.log('the default video and audio are', video, audio)

    useEffect(() => {
        const initializeStream = async () => {
            try {
                let mediaStreamConstraints = {
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true
                    }
                };
                if (video) {
                    mediaStreamConstraints.video = {
                        echoCancellation: true,
                        width: videoWidth,
                        height: videoHeight
                    };
                }

                const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
                const audioTracks = mediaStream.getAudioTracks();
                console.log('Audio tracks are :', audioTracks);
                setStream(mediaStream);
                setIsStreamReady(true);
            } catch (error) {
                console.error('Error initializing localStream:', error);
            }
        };

        initializeStream();
    }, [video, audio, videoWidth, videoHeight]);

    return { localStream, isStreamReady };
};

export default useLocalStream;

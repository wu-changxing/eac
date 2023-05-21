import React, { useState, useEffect, useRef } from "react";

const Video = ({ stream, userLabel, isLocal }) => {
    const videoRef = useRef();
    const waveRef = useRef();

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
        }
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full mb-4">
            <div className="flex items-center mb-2">
                <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
                <h3 className="text-lg font-semibold text-white">{userLabel}</h3>
            </div>
            {isLocal && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleMute}
                >
                    Toggle Mute
                </button>
            )}
            <div className="relative mt-2">
                <div className="bg-white rounded-lg p-2 shadow-md">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full"
                    ></video>
                    <svg
                        ref={waveRef}
                        className="absolute bottom-0 left-0 w-full h-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 20"
                    >
                        <path
                            fill="#3182ce"
                            d="M0 0l24 6.7c24 6.6 72 20 120 16 48-4 96-26 144-40 48-14 96-20 144 6 48 24 96 62 144 78 48 16 96-4 144-22 48-20 96-28 144-12 48 16 96 54 144 52 48-2 96-54 144-54 48 0 96 54 144 58 48 4 96-44 144-48 48-4 96 36 144 52 48 16 96-4 120-12l24-6.7V20H0V0z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Video);

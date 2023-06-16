// src/RoomComponents/Video.js
import React, {useState, useEffect, useRef, useContext} from "react";
import config from "../config";
import {SocketContext} from '../SocketContext';

const Video = ({stream, userLabel, isLocal, socket}) => {
    const videoRef = useRef();
    const [isVideoMuted, setVideoMuted] = useState(false);
    const token = localStorage.getItem("token");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [videoTrackEnabled, setVideoTrackEnabled] = useState(false);
    const [videoTrackMuted, setVideoTrackMuted] = useState(false)

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            if (isLocal) {
                videoRef.current.muted = true;
                setVideoMuted(true);
            }
        }
    }, [stream, isLocal, userLabel]);

    useEffect(() => {
        socket.on("toggle_video", ({user, status}) => {
            if (user !== userLabel) return;
            console.log("Toggling video for user", user, status);
            if (status) {
                setVideoMuted(false);
            } else if (status) {
                setVideoMuted(true);
            }
        });

        return () => {
            socket.off("toggle_video");
        };
    }, [socket]);


    useEffect(() => {
        if (isLocal && stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                setVideoTrackEnabled(videoTrack.enabled);
                setVideoTrackMuted(videoTrack.muted);

                videoTrack.onmute = () => setVideoTrackEnabled(false);
                videoTrack.onunmute = () => setVideoTrackEnabled(true);
            }
        }
    }, [stream, isLocal]);


    useEffect(() => {
        setVideoMuted(!videoTrackEnabled || videoTrackMuted);
    }, [videoTrackEnabled, videoTrackMuted]);


    // Put the avatar URL here
    useEffect(() => {
        if (isVideoMuted) {
            fetch(`${config.DJ_END}/eac/user/${userLabel}/avatar/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setAvatarUrl(data.avatar)
                })
                .catch(error => console.log(error));
        }
    }, [isVideoMuted, userLabel, token]);


    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full mb-4 text-4xl z-[2]">
            <div className="flex items-center mb-2">
                <div className="h-4 w-4 bg-sky-500 rounded-full mr-2"></div>
                <h3 className="lg:text-lg font-semibold text-sky-700">{userLabel}</h3>
                {isLocal && <span className="text-gray-400">(You)</span>}
            </div>

            <div className="relative mt-2">
                <div className="bg-white rounded-full p-2 shadow-md">
                    {isVideoMuted ?
                        <img src={avatarUrl} alt="User Avatar" className="w-full rounded-full"/>
                        :
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full rounded-full relative z-[1]"
                        ></video>
                    }
                </div>
            </div>
        </div>
    );
};

export default React.memo(Video);

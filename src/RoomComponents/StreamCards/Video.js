import React, {useState, useEffect, useRef} from "react";
import config from "../../config";

const Video = ({stream, userLabel, isLocal, socket}) => {
    const videoRef = useRef();
    const [isVideoMuted, setVideoMuted] = useState(false);
    const token = localStorage.getItem("token");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [videoTrackAvailable, setVideoTrackAvailable] = useState(false);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.muted = isLocal;  // Mute the video element if the stream is local
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                setVideoTrackAvailable(videoTrack.enabled);
                videoTrack.onmute = () => setVideoTrackAvailable(false);
                videoTrack.onunmute = () => setVideoTrackAvailable(true);
                console.log("available", videoTrack.enabled);
            }
            // console.log("video track available:", videoTrackAvailable);
        }
    }, [stream, isLocal]);
    useEffect(() => {
        console.log("Updated video track available:", videoTrackAvailable);
    }, [videoTrackAvailable]);

    // useEffect(() => {
    //     socket.on("toggle_video", ({user, status}) => {
    //         if (user !== userLabel) return;
    //         setVideoTrackAvailable(status);
    //     });
    //     return () => {
    //         socket.off("toggle_video");
    //     };
    // }, [socket, userLabel]);

    useEffect(() => {
        if (isVideoMuted || !videoTrackAvailable) {
            fetch(`${config.DJ_END}/eac/user/${userLabel}/avatar/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setAvatarUrl(data.avatar))
                .catch(error => console.log(error));
        }
    }, [isVideoMuted, videoTrackAvailable, userLabel, token]);

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full mb-4 text-xl z-[2]">
            <div className="flex items-center mb-2">
                <div className="h-4 w-4 bg-sky-500 rounded-full mr-2"></div>
                <h3 className="lg:text-lg font-semibold text-sky-700">{userLabel}</h3>
                {isLocal && <span className="text-gray-400">(You)</span>}
            </div>
            <div className="relative mt-2">
                <div className="bg-white rounded-full p-2 shadow-md">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-full relative"
                        style={{ display: videoTrackAvailable ? "block" : "none" }}
                    />
                    {!videoTrackAvailable && <img src={avatarUrl} alt="User Avatar" className="w-full rounded-full" />}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Video);

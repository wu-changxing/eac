// src/components/RoomControl.js
import React, {useState, useEffect} from "react";
import {IoMdReturnLeft, IoIosCloseCircle, IoIosRemoveCircle} from "react-icons/io";
import {GiHighKick} from "react-icons/gi";
import {useNavigate} from "react-router-dom";
import {IoVideocamOff, IoVideocam} from "react-icons/io5";
import {IoMicOff, IoMic} from "react-icons/io5";
import Modal from "../components/Modals/Modal";
import { Prompt } from 'react-router-dom';

const RoomControl = ({socket, roomId, isAdmin, localStream, openVideo, setOpenVideo, users}) => {
    const [showModal, setShowModal] = useState(false);
    const [leaveRoomModal, setLeaveRoomModal] = useState(false);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [videoStatus, setVideoStatus] = useState(false);
    const [audioStatus, setAudioStatus] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    const handleBeforeUnload = (event) => {
        if (!isLeaving) {
            event.preventDefault();
            event.returnValue = '';
        }
    };


    const leaveRoom = () => {
        setIsLeaving(true);
        // Stop all tracks in the stream
        socket.emit("leave", {room_id: roomId, username: username});
        if (!localStream) {
            console.log('localStream is null');
            return;
        }
        localStream.getTracks().forEach((track) => {
            track.stop();
        });

    }

    const backToRoomList = () => {
        leaveRoom()
        socket.emit("leave", {room_id: roomId, username: username});
        navigate('/roomlists');
    };
    const dismissRoom = () => {
        setIsLeaving(true);
        socket.emit("dismiss_room", {room_id: roomId});
        navigate('/roomlists');
    };
    const confirmLeavePage = () => {
        if (isAdmin) {
            dismissRoom();
        } else {
            leaveRoom();
        }
        setShowModal(false);
    };
    const kickUser = (user) => {
        socket.emit("kick_user", {room_id: roomId, user: user});

        setShowModal(false);
    };


    const toggleAudio = () => {
        localStream.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
            console.log('track.enabled:', track.enabled);
        });
        setAudioStatus(localStream.getAudioTracks()[0]?.enabled ?? false);
    };
    const toggleVideo = async () => {
        if (!localStream) return;

        let videoTrack = localStream.getVideoTracks()[0];
        if (!videoTrack) {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({video: true});
                videoTrack = newStream.getVideoTracks()[0];
                localStream.addTrack(videoTrack);
            } catch (error) {
                console.error("Error adding video track:", error);
                return;
            }
        }

        videoTrack.enabled = !videoTrack.enabled;
        setVideoStatus(videoTrack.enabled);
        setOpenVideo(videoTrack.enabled);

        socket.emit("toggle_video", {user: username, status: videoTrack.enabled, room_id: roomId});
    };

    return (
        <div className="border-b pb-4  text-lg sm:text-4xl md:text-lg lg:text-lg">
            {/*<Prompt*/}
            {/*    when={!isLeaving}*/}
            {/*    message="Are you sure you want to leave this room?"*/}
            {/*/>*/}
            <div className="flex items-end space-x-4">
                <button
                    className="flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold p-4 md:p-4 lg:p-2 rounded"
                    onClick={backToRoomList}>
                    <IoMdReturnLeft className="mr-2 font-bold"/>
                    <span className="lg:inline hidden">leave</span>
                </button>
                <button
                    className="flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold p-4 lg:p-2 rounded"
                    onClick={toggleAudio}
                >
                    {audioStatus ? <IoMic className="mr-2 font-bold"/> : <IoMicOff className="mr-2 font-bold"/>}
                    <span className="lg:inline hidden">{audioStatus ? "Mute Audio" : "Unmute Audio"}</span>
                </button>

                <button
                    className="flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold p-4 lg:p-2 rounded"
                    onClick={toggleVideo}
                >
                    {videoStatus ? <IoVideocam className="mr-2 font-bold"/> :
                        <IoVideocamOff className="mr-2 font-bold"/>}
                    <span className="lg:inline hidden">{videoStatus ? "Disable Video" : "Enable Video"}</span>
                </button>
                {isAdmin && (
                    <>
                        <button
                            className="flex items-center p-4 lg:p-2 font-semibold text-white transition duration-500 ease-in-out transform bg-gray-50 rounded-lg hover:bg-red-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                            onClick={dismissRoom}
                        >
                            <IoIosRemoveCircle className="mr-2 text-red-500"/>
                            <span className="lg:inline hidden text-red-500">Dismiss</span>
                        </button>

                        <button
                            className="flex items-center p-4 lg:p-2 font-semibold text-white transition duration-500 ease-in-out transform bg-gray-50 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                            onClick={() => setShowModal(true)}
                        >
                            <GiHighKick className="mr-2 text-red-500"/>
                            <span className="lg:inline hidden text-red-500">Kick</span>
                        </button>
                    </>
                )}
            </div>
            <Modal
                cancelText={"Cancel"}
                confirmText={"Confirm"}
                show={leaveRoomModal}
                setShow={() => setLeaveRoomModal(false)} // Corrected here
                title={"Leave Room"}
                onConfirm={confirmLeavePage}/>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl mx-auto text-gray-800">
                        <h3 className="text-2xl font-semibold mb-4">Kick selected user </h3>
                        {users &&
                            users.map((user) => (
                                <div
                                    className="flex items-center space-x-4 mb-4 cursor-pointer"
                                    onClick={() => kickUser(user.user)}
                                >
                                    <div className="h-14 w-14 rounded-full overflow-hidden">
                                        {/*<img src={user.avatar} alt={user.sid}*/}
                                        {/*     className="h-full w-full object-cover"/>*/}
                                    </div>
                                    <div>{user.user}</div>
                                </div>
                            ))}
                        <button
                            className="flex items-center px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                            onClick={() => setShowModal(false)}
                        >
                            <IoIosCloseCircle className="mr-2"/>
                            <span className="lg:inline hidden">Close</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomControl;

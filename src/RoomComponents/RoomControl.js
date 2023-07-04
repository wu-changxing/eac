// src/components/RoomControl.js
import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from '../SocketContext';
import {IoMdReturnLeft, IoIosCloseCircle, IoIosRemoveCircle} from "react-icons/io";
import {GiHighKick,GiWalkingBoot} from "react-icons/gi";
import {useNavigate, useParams} from "react-router-dom";
import {IoVideocamOff, IoVideocam} from "react-icons/io5";
import {IoMicOff, IoMic} from "react-icons/io5";
import Modal from "../components/Modals/Modal";
import UserCard from "./UserCard";
import config from "../config";
import UserList from "./UserList";

const RoomControl = ({ isAdmin, localStream, openVideo, setOpenVideo, users}) => {
    const roomId = useParams().roomId;
    const { state: socketState } = useContext(SocketContext);
    const { socket, peer } = socketState;
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
        <div className="border-b pt-4 text-lg md:text-lg lg:text-lg">

            <div className="flex items-end lg:space-x-3">
                <button
                    className="flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold p-4 md:p-4 lg:p-2 rounded"
                    onClick={backToRoomList}>
                    <GiWalkingBoot className="mr-2 font-bold"/>
                    <span className="lg:inline hidden">leave</span>
                </button>
                <button
                    className="flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold p-4 lg:p-2 rounded"
                    onClick={toggleAudio}
                >
                    {audioStatus ? <IoMic className="mr-2 font-bold"/> : <IoMicOff className="mr-2 font-bold"/>}
                    <span className="lg:inline hidden">{audioStatus ? "Mute" : "Unmute"}</span>
                </button>

                <button
                    className="flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold p-4 lg:p-2 rounded"
                    onClick={toggleVideo}
                >
                    {videoStatus ? <IoVideocam className="mr-2 font-bold"/> :
                        <IoVideocamOff className="mr-2 font-bold"/>}
                    <span className="lg:inline hidden">{videoStatus ? "Disable" : "Enable"}</span>
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
               <UserList users={users} clickHandler={kickUser} setShowModal={setShowModal}/>
            )}
        </div>
    );
};

export default RoomControl;

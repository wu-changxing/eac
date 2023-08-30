// src/components/RoomControl.js
import React, {useState, useEffect, useContext} from "react";
import {SocketContext} from '../../SocketContext';
import {IoMdReturnLeft, IoIosCloseCircle, IoIosRemoveCircle} from "react-icons/io";
import {GiHidden, GiHighKick, GiWalkingBoot} from "react-icons/gi";
import {useNavigate, useParams} from "react-router-dom";
import {IoVideocamOff, IoVideocam} from "react-icons/io5";
import {IoMicOff, IoMic} from "react-icons/io5";
import Modal from "../../components/Modals/Modal";
import UserCard from "./UserCard";
import config from "../../config";
import UserList from "./UserList";
import {RiRefreshLine, RiShutDownLine} from "react-icons/ri";
import useRoomStore from "../../useRoomStore";
import AdminControls from "./AdminControls";

const RoomControl = ({localStream, openVideo, setOpenVideo, users}) => {
    const roomId = useParams().roomId;
    const {isAdmin, isRoomHidden, videoStatus, audioStatus, setVideoStatus, setAudioStatus} = useRoomStore(state => ({
        isAdmin: state.isAdmin,
        isRoomHidden: state.isRoomHidden,
        videoStatus: state.videoStatus,
        audioStatus: state.audioStatus,
        setVideoStatus: state.setVideoStatus,
        setAudioStatus: state.setAudioStatus,
    }));
    const {state: socketState} = useContext(SocketContext);
    const {socket, peer} = socketState;
    const [showModal, setShowModal] = useState(false);
    const [leaveRoomModal, setLeaveRoomModal] = useState(false);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [isLeaving, setIsLeaving] = useState(false);

    // Function to handle the click event of the "Hide" button
    const handleHideRoom = () => {
        // Emit a socket event to hide the room
        socket.emit("hide_room", {room_id: roomId, hidden: !isRoomHidden})
    };

    const level = localStorage.getItem("level");
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
        console.log("audioStatus is:", audioStatus);
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
    const refreshPage = () => {
        window.location.reload();
    };
    return (
        <div className="border-b pt-4 text-lg md:text-lg lg:text-lg">
            <div className="flex items-end justify-center flex-wrap lg:space-x-3">
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
                <button
                    className="flex items-center bg-sky-500 hover:bg-sky-700 text-white font-bold p-4 lg:p-2 rounded"
                    onClick={refreshPage}
                >
                    <RiRefreshLine className="mr-2 font-bold"/>
                    <span className="lg:inline hidden">Reconnect</span>
                </button>

        </div>
    {
        isAdmin && (
            <div className="flex items-end justify-center flex-wrap lg:space-x-3">
                <AdminControls
                    roomId={roomId}
                    setShowModal={setShowModal}
                    level={level}
                    localStream={localStream}
                    socket={socket}
                />
            </div>
        )
    }
    <Modal
        cancelText={"Cancel"}
        confirmText={"Confirm"}
        show={leaveRoomModal}
        setShow={() => setLeaveRoomModal(false)} // Corrected here
        title={"Leave Room"}
        onConfirm={confirmLeavePage}/>
    {
        showModal && (
            <UserList users={users} clickHandler={kickUser} setShowModal={setShowModal}/>
        )
    }
</div>
)
    ;
};

export default RoomControl;

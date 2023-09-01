import React, {useContext, useEffect} from 'react';
import CheckIn from '../../ProfileComponents/CheckIn';
import { useTransition, animated } from "react-spring";
import RoomControl from "./RoomControl";
import UserCard from "./UserCard";
import {SocketContext} from "../../SocketContext";
import useRoomStore from "../../useRoomStore";
import { FaEdit } from 'react-icons/fa';
const RoomPanel = ({
                       users,
                       localStream,
                       openVideo,
                       setOpenVideo,
                   }) => {


    console.log('the users are', users)
    const transitions = useTransition(users.length > 0, {
        from: {
            opacity: 0,
            transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)'
        },
        enter: {
            opacity: 1,
            transform: 'perspective(600px) translate3d(0%,0,0) rotateY(0deg) scale(1)',
            boxShadow: '0px 30px 50px rgba(0, 0, 0, 0.4)',
            config: { friction: 18 }
        },
        leave: {
            opacity: 0,
            transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
            config: { duration: 5 }
        },
        config: { mass: 1, tension: 280, friction: 20, precision: 0.00001 },
    });
    const {state: socketState} = useContext(SocketContext);
    const {socket, peer} = socketState;
    const isAdmin = useRoomStore(state => state.isAdmin);
    const isRoomHidden = useRoomStore(state => state.isRoomHidden);
    const roomName = useRoomStore(state => state.roomName); // get room name from Zustand store
    const setRoomName = useRoomStore(state => state.setRoomName); //
    const roomId = useRoomStore(state => state.roomId); // get room id from Zustand store
    const handleEditRoomName = () => {
        const newRoomName = prompt('Enter the new room name:', roomName);
        if (newRoomName) {
            setRoomName(newRoomName);
            socket.emit("update_room_name", {room_id: roomId, room_name: newRoomName});
        }
    };
    return (
        transitions((styles, item) => item &&
            <animated.div
                style={styles}
                className={`flex flex-col justify-between mt-4 h-[600px] lg:w-[599] lg:h-[756] p-4 bg-gray-50 border border-gray-300 rounded-md overflow-auto`}
            >
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-indigo-700">Room Panel</h2>
                    <div className="space-y-2">
                        {users && users.map(user =>
                            <UserCard key={user.sid} user={user} />
                        )}
                    </div>
                    <CheckIn className="mt-4" experience={0} />
                </div>
                {isAdmin && (
                    <div className="flex flex-wrap items-center justify-between bg-gray-100 rounded-lg p-2 w-full lg:w-auto">
                        <span className="text-gray-700 font-semibold">{roomName}</span> {/* Display the room name */}
                        <button
                            className="ml-2 p-2 rounded-full bg-sky-500 transition duration-500 ease-in-out transform focus:outline-none focus:ring focus:ring-blue-200"
                            onClick={handleEditRoomName}
                        >
                            <FaEdit className="text-white bg-sky-500 text-xl lg:text-2xl" /> {/* Using Font Awesome Edit Icon */}
                        </button>
                    </div>
                )}
                <RoomControl
                    localStream={localStream}
                    openVideo={openVideo}
                    setOpenVideo={setOpenVideo}
                    users={users}
                />
            </animated.div>
        )
    );
};

export default RoomPanel;

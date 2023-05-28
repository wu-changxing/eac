import React, {useState, useEffect} from "react";
import {IoMdReturnLeft, IoIosCloseCircle, IoIosRemoveCircle} from "react-icons/io";
import {GiHighKick} from "react-icons/gi";
import {useNavigate} from "react-router-dom";

const AdminRoomControl = ({socket, roomId, isAdmin}) => {
    const [users, setUsers] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const backToRoomList = () => {
        navigate('/roomlists');
    };
    const dismissRoom = () => {
        socket.emit("dismiss_room", {room_id: roomId});
    };

    const kickUser = (user) => {
        socket.emit("kick_user", {room_id: roomId, user: user});
        setShowModal(false);
    };

    useEffect(() => {
        const handleRoomUsers = (data) => {
            console.log("room_users:", data);
            if (data.users) {
                setUsers(Object.values(data.users));
            } else {
                console.error("data.users is not an array:", data.users);
            }
        };

        if (socket) {
            socket.on("room_users", handleRoomUsers);

            return () => {
                socket.removeListener("room_users", handleRoomUsers);
            };
        }
    }, [socket]);

    return (
        <div className="border-b pb-4 mb-4 text-5xl lg:text-lg">
            <div className="flex items-end space-x-4">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold p-8 lg:p-2 rounded"
                    onClick={backToRoomList}>
                    <IoMdReturnLeft className="mr-2 font-bold"/>
                    <span className="lg:inline hidden">Back</span>
                </button>
                {isAdmin && (
                    <>
                        <button
                            className="flex items-center p-8 lg:p-2 font-semibold text-white transition duration-500 ease-in-out transform bg-gray-50 rounded-lg hover:bg-red-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                            onClick={dismissRoom}
                        >
                            <IoIosRemoveCircle className="mr-2 text-red-500"/>
                            <span className="lg:inline hidden">Dismiss</span>
                        </button>

                        <button
                            className="flex items-center p-8 lg:p-2 font-semibold text-white transition duration-500 ease-in-out transform bg-gray-50 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                            onClick={() => setShowModal(true)}
                        >
                            <GiHighKick className="mr-2 text-red-500"/>
                            <span className="lg:inline hidden">Kick</span>
                        </button>
                    </>
                )}
            </div>
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
                                        <img src={user.avatar} alt={user.sid}
                                             className="h-full w-full object-cover"/>
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

export default AdminRoomControl;

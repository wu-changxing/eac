import React, {useState, useEffect} from "react";
import {IoMdReturnLeft} from "react-icons/io";

const AdminRoomControl = ({socket, roomId, isAdmin}) => {
    const [users, setUsers] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
        <div className="flex items-center space-x-4">
            <button
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={backToRoomList}>
                <IoMdReturnLeft className="mr-2"/>
                Back
            </button>
            {isAdmin && (
                <>
                    <button
                        className="px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                        onClick={dismissRoom}
                    >
                        Dismiss Room
                    </button>

                    <div className="mt-4">
                        <button
                            className="px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                            onClick={() => setShowModal(true)}
                        >
                            Kick User
                        </button>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl mx-auto text-gray-800">
                                <h3 className="text-2xl font-semibold mb-4">Kick User Out</h3>
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
                                    className="px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminRoomControl;

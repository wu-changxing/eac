// src/components/UserListModal.js
import React from 'react';
import { GiHighKick } from 'react-icons/gi';
import { IoIosCloseCircle } from 'react-icons/io';
import config from '../../config';
import useRoomStore from '../../useRoomStore';  // Update the path according to your project structure


const UserList = ({ clickHandler, setShowModal }) => {
    const { users } = useRoomStore();

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl mx-auto text-gray-800">
                <h3 className="text-2xl font-semibold mb-4">selected user</h3>
                {users &&
                    users.map((user) => (
                        <div
                            key={user.username}
                            className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border-b"
                            onClick={() => clickHandler(user.username)}
                        >
                            <div className="flex items-center space-x-4">
                                {user.avatar ? (
                                    <img
                                        className="rounded-full w-12 h-12"
                                        src={`${config.DJ_END}${user.avatar}`}
                                        alt={user.username}
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-300" />
                                )}
                                <div className="flex flex-row space-x-2">
                                    <div className="text-lg font-medium text-gray-900">{user.username}</div>
                                    {user.badge ? (
                                        <div className="text-sm text-pink-500">{user.badge.name}</div>
                                    ) : (
                                        <div className="text-sm text-gray-500">No badge</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                <button
                    className="flex items-center px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                    onClick={() => setShowModal(false)}
                >
                    <IoIosCloseCircle className="mr-2" />
                    <span className="lg:inline hidden">Close</span>
                </button>
            </div>
        </div>
    );
};

export default UserList;

import React from 'react';
import { FaUser, FaMedal } from 'react-icons/fa';
import config from '../../config';

const UserCard = ({ user }) => {
    console.log(user);
    return (
        <div className="flex flex-col bg-white p-4 rounded shadow space-y-2">
            <div className="flex items-center space-x-4">
                {user.avatar ? (
                    <img
                        className="rounded-full w-12 h-12"
                        src={`${config.DJ_END}${user.avatar}`}
                        alt={user.username}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300">
                        <FaUser className="text-sky-500" />
                    </div>
                )}
                <div className="flex flex-col">
                    <div className="text-lg font-medium text-gray-900">{user.username}</div>
                    {user.badge ? (
                        <div className="flex items-center text-sm text-white bg-pink-500 shadow-md shadow-sky-700 rounded-full px-2 py-1">
                            <FaMedal className="mr-1" />
                            {user.badge.name}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">No badge</div>
                    )}
                </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
                <div>Lv {user.level}</div>
                <div>Exp {user.exp}</div>
                {user.invited_by ? (
                    <div>Invited by {user.invited_by}</div>
                ) : (
                    <div>Invited by Admin</div>
                )}
            </div>
        </div>
    );
};

export default UserCard;

import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaMedal, FaCircle, FaRegCircle, FaSignal } from 'react-icons/fa';
import config from '../../config';
import { SocketContext } from "../../SocketContext";

const formatDateAndTime = (isoString) => {
    // 添加 "Z" 以明确这是一个 UTC 时间
    const date = new Date(`${isoString}Z`);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const localTime = date.toLocaleString('zh-CN', { timeZone: timeZone });

    const [_, year, month, day, hour, minute, second] = localTime.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/);
    const formattedTime = `${month}/${day} ${hour}:${minute}:${second}`;

    return formattedTime;
};



const UserCard = ({ user }) => {
    const [peerIds, setPeerIds] = useState([]);
    const { state: socketState } = useContext(SocketContext);
    const { socket, peer } = socketState;

    useEffect(() => {
        if (peer && peer.connections) {
            setPeerIds(Object.keys(peer.connections));
        }
    }, [peer]);

    const username = localStorage.getItem('username');
    const isMe = username === user.username;

    return (
        <div className="flex flex-col bg-white p-4 rounded shadow">
            <div className="flex flex-row items-center space-x-4">
                {user.avatar ? (
                    <img
                        className="rounded-full w-12 h-12"
                        src={`${config.DJ_END}${user.avatar}`}
                        alt={user.username}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300">
                        <FaUser className="text-sky-500 text-xl" />
                    </div>
                )}
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                        <div className="text-lg font-medium text-gray-900">
                            {isMe ? `${user.username}(You)` : user.username}
                        </div>

                        {user.online ?
                            <FaCircle className="text-sky-500" />
                            :
                            <FaRegCircle className="text-red-500" />
                        }
                        {!isMe && (
                            peerIds.includes(user.peer_id) ? (
                                <FaSignal className="text-sky-500 text-xl" />
                            ) : (
                                <span className="text-sm text-gray-500">Not in room</span>
                            )
                        )}
                        <div className="ml-auto text-xs text-gray-500">
                            {user.last_seen && (
                                <div className="text-xs lg:text-sm text-gray-500 flex-wrap">
                                    Last Seen: {formatDateAndTime(user.last_seen)}
                                </div>
                            )}
                        </div>

                    </div>

                    {user.badge ? (
                        <div className="flex items-center text-sm text-white bg-pink-500 rounded-full px-2 py-1 w-24">
                            <FaMedal className="mr-1" />
                            {user.badge.name}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">No badge</div>
                    )}
                </div>
            </div>
            <div className="flex justify-between mt-4 mb-0 text-sm text-gray-600">
                <div className="text-xs">Lv {user.level}</div>
                <div className="text-xs">Exp {user.exp}</div>
                {user.invited_by ? (
                    <div className="text-xs">Invited by {user.invited_by}</div>
                ) : (
                    <div className="text-xs">Invited by Admin</div>
                )}
            </div>
        </div>
    );
};

export default UserCard;

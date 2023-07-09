import React, {useContext, useEffect, useState} from 'react';
import {FaUser, FaMedal, FaCircle, FaRegCircle, FaSignal} from 'react-icons/fa';
import config from '../../config';
import {SocketContext} from "../../SocketContext";
import {MdConnectWithoutContact} from "react-icons/md";
import {FaPeopleRobbery} from "react-icons/fa";
import {GiAerialSignal} from "react-icons/gi";

const UserCard = ({user}) => {
    const [peerIds, setPeerIds] = useState([]);
    const {state: socketState} = useContext(SocketContext);
    const {socket, peer} = socketState;
    console.log("user is", user)
    useEffect(() => {
        if (peer && peer.connections) {
            console.log('Connected peers:', Object.keys(peer.connections));
            setPeerIds(Object.keys(peer.connections));
        }
    }, [peer]);
    const username = localStorage.getItem('username');
    const isMe = username === user.username;
    console.log(user);
    return (
        <div className="flex flex-col bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-4">
                {user.avatar ? (
                    <img
                        className="rounded-full w-12 h-12"
                        src={`${config.DJ_END}${user.avatar}`}
                        alt={user.username}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300">
                        <FaUser className="text-sky-500 text-xl"/>
                    </div>
                )}
                <div className="flex flex-col">
                    {isMe ? (
                        <div className="text-lg font-medium text-gray-900">{user.username}(You)</div>
                    ) : (
                        <>
                            <div className="flex items-center space-x-2">
                                <div className="text-lg font-medium text-gray-900">{user.username}</div>
                                {user.online ?
                                    <><FaCircle className="text-sky-500"/><div className="text-xxs text-blue-500"></div></>
                                    :
                                    <><FaRegCircle className="text-red-500"/><div className="text-xxxs text-gray-500">Offline</div></>
                                }
                                {peerIds.includes(user.peer_id) ? (
                                    <>
                                        <FaSignal className="text-sky-500 text-xl"/>
                                        <div className="text-xxs text-sky-500"></div>
                                    </>
                                ) : (
                                    <div className="text-sm text-gray-500">Not connected</div>
                                )}
                            </div>
                        </>
                    )}
                    {user.badge ? (
                        <div
                            style={{width: 'fit-content'}}
                            className="flex items-center text-sm text-white bg-pink-500 shadow-md shadow-sky-700 rounded-full px-2 py-1">
                            <FaMedal className="mr-1"/>
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

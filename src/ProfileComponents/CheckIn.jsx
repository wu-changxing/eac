// src/ProfileComponents/CheckIn.js
import React, {useState, useContext, useEffect} from "react";
import {SocketContext} from '../SocketContext';
import {FaCheckCircle} from 'react-icons/fa';

const CheckIn = ({experience}) => {
    const {state: {socket}} = useContext(SocketContext);
    const [socketReady, setSocketReady] = useState(false);

    const [checkedIn, setCheckedIn] = useState(false);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const [exp, setExp] = useState(experience);

    const checkIn = () => {
        if (!checkedIn) {
            setCheckedIn(true);
            socket.emit('check', {token});
            setMessage('Successfully checked in. Your experience has increased!');
        } else {
            setMessage("You've already checked in today!");
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    useEffect(() => {
        if (socket) {
            setSocketReady(true);
            socket.emit('check_status', {token});
            socket.on('check_status', (response) => {
                if (response.status){
                    setCheckedIn(false);
                } else {
                    setCheckedIn(true);
                }
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            });
            socket.on('exp_updated', ({exp}) => {
                setExp(exp);
                setCheckedIn(true);
            })
        }
    }, [socket]);

    return (
        <>
            {socketReady && <button
                className={`mt-4 md:mt-8 text-sm md:text-base font-bold py-2 px-4 rounded flex items-center ${checkedIn ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-700'}`}
                onClick={checkIn} disabled={checkedIn}>
                <FaCheckCircle className="mr-1 md:mr-2"/>
                Check In
            </button>}
            {message && <div className="mt-2 md:mt-4 text-sm md:text-base text-green-500">{message}</div>}
        </>
    );
};

export default CheckIn;

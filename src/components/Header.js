import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {SocketContext} from '../SocketContext';
import {FaListUl, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaHome, FaUserCircle, FaCalendarAlt} from 'react-icons/fa';
import {GiWoodenSign} from 'react-icons/gi';
import Navbar from "./Navbar";
import macaw6 from "../../assets/macaw6.svg";
import InstallButton from "./InstallButton";
const Header = ({authenticated}) => {
    const {state: socketState} = useContext(SocketContext);
    const socket = socketState.socket;
    const peer = socketState.peer;
    const isSocketConnected = socket && socket.connected;
    const isPeerReady = peer !== null;
    const isPeerConnected = peer && peer.connected;

    return (
        <header className="fixed top-0 text-lg w-full bg-gray-200 h-12 lg:h-16">
            <div className="flex flex-row justify-between items-center h-full px-2 sm:px-4 md:px-10 lg:px-20">
                <div className="flex items-center justify-start ">

                    <Link to="/" className="relative">
                        <img className="h-20 w-20 sm:h-20 sm:w-20 lg:h-30 lg:w-30 z-10 -mb-10 " src={macaw6} alt="logo" />
                    </Link>
                </div>

                <nav className="text-lg">

                    <ul className="flex flex-row items-center text-2xl sm:text-3xl">

                        <div className={`h-7 w-7 sm:h-8 sm:w-8 lg:h-12 lg:w-12 rounded-8xl border-2 ${isSocketConnected ? 'border-green-500' : 'border-red-500'} p-1 flex items-center justify-center mr-1`}>
                            <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-8xl ${isPeerReady ? 'bg-green-500' : 'bg-red-500'} p-1 flex items-center justify-center`}>
                                <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-8xl ${isPeerConnected ? 'bg-green-500' : 'bg-sky-400'}`}>
                                </div>
                            </div>
                        </div>

                        {authenticated ? (
                            <>
                                <li className="mx-2 my-0 hidden lg:block">
                                    <Link to="/">
                                        <FaHome className="inline sm:mr-2 text-sky-500"/><span
                                        className="hidden sm:inline">Home</span></Link>
                                </li>
                                <li className="mx-2 my-0 hidden lg:block">
                                    <Link to="/profile">
                                        <FaUserCircle className="inline sm:mr-2 text-sky-500"/><span
                                        className="hidden sm:inline">Profile</span></Link>
                                </li>
                                <li className="mx-2 my-0 hidden lg:block">
                                    <Link to="/events">
                                        <GiWoodenSign className="inline sm:mr-2 text-sky-500"/><span
                                        className="hidden sm:inline">Events</span></Link>
                                </li>
                                <li className="mx-2 my-0 hidden lg:block">
                                    <Link to="/logout"><FaSignOutAlt className="inline sm:mr-2 text-sky-500"/><span
                                        className="hidden sm:inline">Logout</span></Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mx-2 my-0">
                                    <Link to="/login"><FaSignInAlt className="inline sm:mr-2 text-sky-500"/><span
                                        className="hidden sm:inline">Login</span></Link>
                                </li>
                                <li className="mx-2 my-0">
                                    <Link to="/register"><FaUserPlus className="inline sm:mr-2 text-sky-500"/><span
                                        className="hidden sm:inline">Register</span></Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="flex items-center text-lg hidden lg:block">
                    <Navbar/>
                </div>
            </div>
        </header>
    );
};

export default Header;

import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {SocketContext} from '../SocketContext';
import {FaListUl, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaHome} from 'react-icons/fa'; // Import icons
import Navbar from "./Navbar";
import logo  from "../logo.svg";
import macaw6 from "../../assests/macaw6.svg";

const Header = ({authenticated}) => {
    const {state: socketState} = useContext(SocketContext);
    const socket = socketState.socket;
    const peer = socketState.peer;
    const isSocketConnected = socket && socket.connected;
    const isPeerReady = peer !== null;
    const isPeerConnected = peer && peer.connected;

    return (
        <header className="fixed top-0 text-5xl  w-full bg-gray-200 h-20 lg:h-16">
            <div className="flex flex-col md:flex-row justify-between items-start h-full px-4 md:px-10 lg:px-20">
                <nav className="lg:text-lg">
                    <ul className="flex flex-col md:flex-row items-center lg:text-xl">
                        <li className="mx-2 my-2 md:my-0 relative">
                            <img className="h-28 w-28 z-10 -mb-14" src={macaw6} alt=" logo"/>
                        </li>


                        {authenticated ? (
                            <>
                                <li className="mx-2 my-2 md:my-0">
                                    <Link to="/">
                                        <FaHome className="inline lg:hidden mr-2"/><span
                                        className="lg:inline hidden">Home</span></Link>
                                </li>
                                <li className="mx-2 my-2 md:my-0">
                                    <Link to="/logout"><FaSignOutAlt className="inline lg:hidden mr-2"/><span
                                        className="lg:inline hidden">Logout</span></Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mx-2 my-2 md:my-0">
                                    <Link to="/login"><FaSignInAlt className="inline lg:hidden mr-2"/><span
                                        className="lg:inline hidden">Login</span></Link>
                                </li>
                                <li className="mx-2 my-2 md:my-0">
                                    <Link to="/register"><FaUserPlus className="inline lg:hidden mr-2"/><span
                                        className="lg:inline hidden">Register</span></Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="lg:text-lg">
                    <Navbar/>
                </div>
                <div className="flex items-center justify-end">

                    <div
                        className={`h-8 w-8 lg:h-12 lg:w-12 rounded-full border-2 ${isSocketConnected ? 'border-green-500' : 'border-red-500'} p-1 flex items-center justify-center`}>
                        <div
                            className={`h-6 w-6 rounded-full ${isPeerReady ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                            <div className={`h-4 w-4 rounded-full ${isPeerConnected ? 'bg-green-500' : 'bg-blue-500'}`}>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
        ;
};

export default Header;

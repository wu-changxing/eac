import React from "react";
import {FiEdit} from 'react-icons/fi';
import {FaUserFriends, FaLevelUpAlt, FaAward} from 'react-icons/fa';
import {Link} from "react-router-dom";
import config from "../config";


const ProfileCard = ({username, level, invited_by, badge, avatar}) => (
    <div className="m-2 md:m-4 mt-4 md:mt-10 p-2 md:p-4 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full md:max-w-md">
        <div className="relative w-28 md:w-72 h-28 md:h-72 mx-auto mb-2 md:mb-4 -mt-8 md:-mt-16 -mb-14 md:-mb-28">
            <img className="rounded-full w-full h-full" src={`${config.DJ_END}${avatar}`} alt={username} />
        </div>
        <div className="flex justify-between items-center mb-2 md:mb-4 py-4 md:py-8 px-1 md:px-2">
            <div className="text-right">
                <h4 className="text-lg md:text-xl font-bold">{username}</h4>
            </div>
            <div>
                <Link to="/editprofile"
                      className="block w-20 md:w-28 py-2 text-center border border-black rounded-full text-black hover:bg-black hover:text-white transition-all duration-250 flex items-center justify-center"
                >
                    <FiEdit className="md:hidden"/>
                    <span className="hidden md:inline-block">Edit Profile</span>
                </Link>
            </div>
        </div>
        <div className="flex justify-between text-center border-solid border-t-2 p-4 md:p-8">
            <div className="flex flex-col items-center">
                <FaUserFriends className="text-yellow-400 mb-1"/>
                <span className="hidden md:inline-block">Inviter</span>
                <span className="text-sm md:text-base font-bold">{invited_by}</span>
            </div>
            <div className="flex flex-col items-center">
                <FaLevelUpAlt className="text-blue-400 mb-1"/>
                <span className="hidden md:inline-block">Level</span>
                <span className="text-sm md:text-base font-bold">{level}</span>
            </div>
            <div className="flex flex-col items-center">
                <FaAward className="text-pink-500 mb-1"/>
                <span className="hidden md:inline-block">Badge</span>
                <span className="text-sm md:text-base font-bold">{badge}</span>
            </div>
        </div>
    </div>
);

export default ProfileCard;

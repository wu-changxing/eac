// ProfileComponents/ProfileCard.js
import React from "react";
import {FiEdit} from 'react-icons/fi';
import {FaUserFriends, FaLevelUpAlt, FaAward} from 'react-icons/fa';
import {Link} from "react-router-dom";
import config from "../config";


const ProfileCard = ({username, level, invited_by, badge, avatar}) => (
    <div
        className="m-4 lg:mt-10 p-4 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full lg:max-w-md">
        <div className="relative w-72 h-72 lg:w-28 lg:h-28 mx-auto mb-4 -mt-16 -mb-28">
            <img className="rounded-full w-full h-full" src={`${config.DJ_END}${avatar}`} alt={username} />


        </div>
        <div className="flex justify-between items-center mb-4 py-8 px-2">
            <div className="text-right">
                <h4 className="font-bold">{username}</h4>
            </div>
            <div>
                <Link to="/editprofile"
                      className="block w-28 py-2 text-center border border-black rounded-full text-black hover:bg-black hover:text-white transition-all duration-250 flex items-center justify-center"
                >
                    <FiEdit className="lg:hidden"/>
                    <span className="hidden lg:inline-block">Edit Profile</span>
                </Link>
            </div>
        </div>
        <div className="flex justify-between text-center border-solid border-t-2 p-8 lg:p-4">
            <div className="flex flex-col items-center">
                <FaUserFriends className="text-yellow-400 mb-1"/>
                <span className="hidden lg:inline-block">Inviter</span>
                <span className="font-bold">{invited_by}</span>

            </div>
            <div className="flex flex-col items-center">
                <FaLevelUpAlt className="text-blue-400 mb-1"/>
                <span className="hidden lg:inline-block">Level</span>
                <span className="font-bold">{level}</span>

            </div>
            <div className="flex flex-col items-center">
                <FaAward className="text-pink-500  mb-1"/>
                <span className="hidden lg:inline-block">Badge</span>
                <span className="font-bold">{badge}</span>

            </div>
        </div>
    </div>
);

export default ProfileCard;

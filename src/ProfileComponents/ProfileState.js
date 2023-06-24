// src/ProfileComponents/ProfileState.js
import React, {useState, useContext} from "react";
import {FaAward, FaCoins, FaLevelUpAlt, FaStar, FaUserFriends} from 'react-icons/fa';
import {SocketContext} from '../SocketContext';
import CheckIn from './CheckIn';

const ProfileState = ({level, credits, experience, invited_by}) => {
    const totalCredits = 100;
    const totalExperience = 3000;
    const progressPercentageCredits = (credits / totalCredits) * 100;
    const progressPercentageExperience = (experience / totalExperience) * 100;

    return (
        <div className="p-6 my-4 bg-white rounded-lg shadow-xl  w-full md:max-w-md lg:max-w-lg text-center">


            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 items-center justify-center text-center border-solid border-t-2 pt-2">
                <div className="flex items-center col-span-2">
                    <FaCoins className="text-yellow-400 mr-1 md:mr-2"/>
                    <div className="flex-grow relative h-3 md:h-4 rounded-lg bg-gray-200">
                        <div style={{width: `${progressPercentageCredits}%`}}
                             className="absolute h-3 md:h-4 bg-yellow-400 rounded-lg"></div>
                    </div>
                    <span className="text-sm md:text-base font-bold ml-1 md:ml-2">{credits} credits</span>
                </div>
                <div className="flex items-center col-span-2">
                    <FaStar className="text-sky-400 mr-1 md:mr-2"/>
                    <div className="flex-grow relative h-3 md:h-4 rounded-lg bg-gray-200">
                        <div style={{width: `${progressPercentageExperience}%`}}
                             className="absolute h-3 md:h-4 bg-sky-400 rounded-lg"></div>
                    </div>
                    <span className="text-sm md:text-base font-bold ml-1 md:ml-2">{experience} exp {level}</span>
                </div>
            </div>
            <div className="flex justify-between text-center border-solid border-t-2 p-4 md:p-8">
                <CheckIn experience={experience}/>
            </div>
        </div>
    );
};

export default ProfileState;

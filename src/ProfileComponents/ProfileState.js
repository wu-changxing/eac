import React from "react";
import {FaAward, FaCoins, FaLevelUpAlt, FaStar, FaUserFriends} from 'react-icons/fa';

const ProfileState = ({level, credits, experience, invited_by}) => {
    const totalCredits = 100;
    const totalExperience = 3000;

    const progressPercentageCredits = (credits / totalCredits) * 100;
    const progressPercentageExperience = (experience / totalExperience) * 100;

    return (
        <div className="m-4 mt-16 lg:my-2 p-4 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full lg:max-w-md text-center">
            <div className="grid grid-cols-3 gap-4 items-center justify-center text-center border-solid border-t-2 pt-2">
                <div className="flex items-center col-span-2">
                    <FaCoins className="text-yellow-400 mr-2"/>
                    <div className="flex-grow relative h-4 rounded-lg bg-gray-200">
                        <div style={{width: `${progressPercentageCredits}%`}} className="absolute h-4 bg-yellow-400 rounded-lg"></div>
                    </div>
                    <span className="font-bold ml-2">{credits} credits</span>
                </div>
                <div className="flex items-center col-span-2">
                    <FaStar className="text-blue-400 mr-2"/>
                    <div className="flex-grow relative h-4 rounded-lg bg-gray-200">
                        <div style={{width: `${progressPercentageExperience}%`}} className="absolute h-4 bg-blue-400 rounded-lg"></div>
                    </div>
                    <span className="font-bold ml-2">{experience} exp {level}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileState;

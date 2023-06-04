// RecommendationCodeCard.js
import React from "react";
import {AiOutlineVerticalAlignTop} from 'react-icons/ai';
import {IoGitNetworkSharp} from 'react-icons/io5';
import {FiCopy} from 'react-icons/fi';
import {FaCheck} from 'react-icons/fa';

const RecommendationCodeCard = ({recommendCode, useLimit, handleCopyClick, copied}) => (
    <div
        className="m-4 mt-16 lg:my-2 p-4 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full lg:max-w-md text-center">
        <div
            className="flex items-center justify-evenly text-center border-solid border-t-2 pt-2 cursor-pointer hover:bg-gray-200"
            onClick={handleCopyClick}>
            <IoGitNetworkSharp className="text-green-400 mr-2"/>
            <div className="flex items-center">
                <span className="hidden lg:inline mr-2">Recommend:</span>
                <span className="font-bold">{recommendCode}</span>
                <FiCopy className="ml-4"/>
            </div>
            {copied && <FaCheck className="text-green-500 ml-2"/>}
            <AiOutlineVerticalAlignTop className="text-red-400 ml-4"/>
            <span className="hidden lg:inline mr-2">Limit:</span>
            <span className="font-bold">{useLimit}</span>
        </div>
        {copied && <div className="mt-2 bg-green-200 text-green-700 p-2 rounded">Copied to clipboard!</div>}
    </div>
);

export default RecommendationCodeCard;

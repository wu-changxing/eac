import React, { useState, useEffect } from "react";
import { AiOutlineVerticalAlignTop, AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import { IoGitNetworkSharp } from 'react-icons/io5';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import {AiOutlineQrcode} from 'react-icons/ai'; // Added
import config from "../config";
import { QRCode } from 'react-qrcode-logo';
import macaw6 from "../../assests/macaw6.svg";
import QRcodeShare from "./QRcodeShare";

const RecommendationCodeCard = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [copied, setCopied] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [newRecommendCode, setNewRecommendCode] = useState("No recommendation code yet");

    const [message, setMessage] = useState("");
    const [useLimit, setUseLimit] = useState(0);
    const [useCount, setUseCount] = useState(0);
    const [leftCount, setLeftCount] = useState(0);
    const [showQRCode, setShowQRCode] = useState(false); // Added
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${config.DJ_END}/eac/api/get-recommendation-code/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    setMessage("You don't have a recommendation code yet. Reach level 1 to create one!");
                }else{
                    setNewRecommendCode(data.recommendation_code);
                    setUseLimit(data.use_limit);
                    setUseCount(data.times_used);
                    setLeftCount(data.left_times);
                }
            });
    }, []);


    const handleCopyClick = () => {
        navigator.clipboard.writeText(newRecommendCode);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        const response = await fetch(

            `${config.DJ_END}/eac/api/update-recommendation-code/`,
             {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                recommendation_code: editValue
            })
        });
        const data = await response.json();
        if(response.ok) {
            setNewRecommendCode(editValue);
            setMessage("Saved successfully");
            setTimeout(() => setMessage(""), 3000);
            navigator.clipboard.writeText(editValue); // Copy to clipboard
        } else {
            setMessage(data.error);
        }
    };
    const handleChange = (e) => {
        setEditValue(e.target.value);
    };

    return (
        <div className="m-4 mt-16 lg:my-2 p-4 bg-white rounded-lg shadow-lg transform transition-all ease-in-out duration-350 w-full lg:max-w-md text-center">
            <div className="flex items-center justify-evenly text-center border-solid border-t-2 pt-2 ">

                {isEditing ? (
                    <input value={editValue} onChange={handleChange} className="mr-2 bg-sky-100 focus:border-sky-500"/>
                ) : (
                    <div className="flex items-center justify-between space-x-10 cursor-pointer hover:bg-gray-200" onClick={handleCopyClick}>
                        <IoGitNetworkSharp className="text-green-400 text-6xl lg:text-lg"/>
                        <span className="hidden lg:inline py-2">Recommend Code:</span>
                        <span className="font-bold overflow-auto py-2">{newRecommendCode}</span>
                        <FiCopy className="ml-4 text-6xl lg:text-lg text-sky-500"/>
                    </div>

                )}
                {copied && <FaCheck className="text-green-500 ml-2"/>}
            </div>
            <div className="flex items-center justify-evenly text-center border-solid border-t-2 pt-2 ">
                {!isEditing && <AiFillEdit onClick={handleEditClick} className="ml-2 text-sky-500"/>}
                {isEditing && (
                    <div onClick={handleSaveClick}>
                        <AiOutlineCheck className="ml-2 bg-sky-500 text-white"/>
                        <span className="hidden lg:inline">Save</span>
                    </div>
                )}

                <AiOutlineVerticalAlignTop className="text-red-400 ml-4"/>

                <div className="hidden lg:block">
                    <span className="mr-2">Limit:</span>
                    <span className="font-bold mr-2">{useLimit}</span>
                    <span className="mr-2">Used:</span>
                    <span className="font-bold">{useCount}</span>
                </div>
                <span className="hidden lg:inline mr-2">Left:</span>
                <span className="font-bold">{leftCount}</span>
                <button onClick={() => setShowQRCode(!showQRCode)} className="ml-2 bg-sky-500 text-white">
                    <AiOutlineQrcode className="ml-2"/>
                    <span className="hidden lg:inline">Share</span>
                </button>

            </div>
            {copied && <div className="mt-2 bg-green-200 text-green-700 p-2 rounded">Copied to clipboard!</div>}
            {message && <div className="mt-2 bg-green-200 text-green-700 p-2 rounded">{message}</div>}
            {showQRCode && <QRcodeShare value={newRecommendCode} />} {/* Updated */}
        </div>

    );
};

export default RecommendationCodeCard;

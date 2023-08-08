import React, { useState, useEffect } from "react";
import { AiOutlineVerticalAlignTop, AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import { IoGitNetworkSharp } from 'react-icons/io5';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import {AiOutlineQrcode} from 'react-icons/ai'; // Added
import config from "../config";
import { QRCode } from 'react-qrcode-logo';
import macaw6 from "../../assets/macaw6.svg";
import QRcodeShare from "./QRcodeShare";
import {BiEdit} from "react-icons/bi";

const RecommendationCodeCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const username = localStorage.getItem('username');
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
        let text = `${username}诚挚地邀请你加入 EAC 社区。这里你不仅可以找到丰富的与ChatGPT相关的英语学习工具，更有一群相互了解和支持的朋友。我们欢迎你作为一名社区的建设者加入我们，而不仅仅是作为一个消费者。

在你决定加入我们之前，请阅读并理解我们的社区公约：https://aaron404.com/zh/eac-log/%E7%A4%BE%E5%8C%BA%E5%85%AC%E7%BA%A6/

你的专属邀请码是：${newRecommendCode} 为了保障你的权益，我们希望你在接收到邀请的三天内使用此邀请码在 EAC 社区进行注册。注册链接为：https://eac.aaron404.com/#/register?recommendation_code=${newRecommendCode}


如果你在三天内没有使用此邀请码注册 EAC，邀请码可能会失效。因此，请尽快行动，我们期待你的加入。

期待在 EAC 社区与你相遇！`;

        navigator.clipboard.writeText(text);
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
        <div className="p-6 my-4 bg-white rounded-lg shadow-xl w-full md:max-w-md lg:max-w-lg text-center">
            <div className="flex flex-col justify-evenly text-center border-solid border-t-2 pt-2 ">
                {isEditing ? (
                    <input value={editValue} onChange={handleChange} className="mb-2 sm:mr-2 bg-sky-100 focus:border-sky-500"/>
                ) : (
                    <div onClick={handleCopyClick} className="mb-2 sm:mb-0 flex items-center justify-between space-x-1 sm:space-x-10 cursor-pointer hover:bg-gray-200">
                        <IoGitNetworkSharp className="text-pink-400 text-2xl sm:text-6xl lg:text-lg"/>
                        <span className="hidden sm:inline py-2">Recommend Code:</span>
                        <span className="font-bold overflow-auto py-2">{newRecommendCode}</span>
                        <FiCopy className="ml-1 sm:ml-4 text-2xl sm:text-6xl lg:text-lg text-sky-500"/>
                    </div>
                )}
                {copied && <FaCheck className="text-green-500 ml-2"/>}
            </div>
            <div className="flex  flex-row justify-evenly text-center border-solid border-t-2 pt-2 ">
                {!isEditing &&
                    <div className=" mb-2 p-2 sm:mb-0 sm:ml-2 bg-sky-500 text-white rounded-xl">
                    <BiEdit onClick={handleEditClick} className="mb-2 sm:mb-0 sm:ml-2 text-white  lg:text-4xl"/>
                    <span className="hidden lg:inline">Edit</span>
                </div>
                }
                {isEditing && (
                    <div onClick={handleSaveClick} className="mb-2 sm:mb-0 sm:ml-2 bg-sky-500 text-white">
                        <AiOutlineCheck className="mb-2 sm:mb-0 sm:ml-2"/>
                        <span className="hidden lg:inline">Save</span>
                    </div>
                )}
                <AiOutlineVerticalAlignTop className="text-red-400 mb-2 text-2xl mt-2"/>
                <div className="mb-2 sm:mb-0 hidden sm:block">
                    <span className="mr-2">Limit:</span>
                    <span className="font-bold mr-2">{useLimit}</span>
                    <span className="mr-2">Used:</span>
                    <span className="font-bold">{useCount}</span>
                </div>
                <span className="hidden sm:inline mr-2">Left:</span>
                <span className="font-bold my-2">{leftCount}</span>
                <button onClick={() => setShowQRCode(!showQRCode)} className="mb-2 p-1 sm:mt-0 sm:ml-2 bg-sky-500 text-white rounded-xl">
                    <AiOutlineQrcode className="ml-2 lg:text-4xl"/>
                    <span className="hidden lg:inline">Share</span>
                </button>
            </div>
            {copied && <div className="mt-2 bg-green-200 text-green-700 p-2 rounded">Copied to clipboard!</div>}
            {message && <div className="mt-2 bg-green-200 text-green-700 p-2 rounded">{message}</div>}
            {showQRCode && <QRcodeShare value={newRecommendCode} />}
        </div>
    );
};

export default RecommendationCodeCard;

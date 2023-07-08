import React, { useEffect, useState } from 'react';
import { FaCoins, FaHourglass, FaMoneyBill, FaMoneyBillAlt } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import config from '../../config';
import { GiPayMoney, GiRobotGrab } from "react-icons/gi";
import { FcEngineering } from "react-icons/fc";

const GiftCard = ({ id, setSelectedGift }) => {
    const [gift, setGift] = useState(null);

    useEffect(() => {
        const fetchGift = async () => {
            try {
                const response = await fetch(`${config.BACKEND}/api/v2/gifts/${id}`);
                const data = await response.json();
                setGift(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchGift();
    }, [id]);

    if (!gift) {
        return <p>Loading...</p>; // Or return null, or a loading spinner, or whatever you prefer.
    }

    return (
        <div
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
            onClick={() => setSelectedGift(gift)}
        >
            <h2 className="font-bold text-lg mb-2 text-center">{gift.name}</h2>
            {/*<img*/}
            <div className="flex flex-col items-center justify-center">
                <img
                    className="w-full h-auto object-contain rounded-full border-b-2 border-pink-500 shadow-md shadow-pink-400 mb-4"
                    src={`${config.DJ_END}${gift.image.url}`}
                    alt={gift.image.alt}
                />
                <p className="text-gray-600 text-center mb-2" dangerouslySetInnerHTML={{ __html: gift.description }} />
                <div className="flex justify-between items-center mb-2 w-full">
                    <div className="flex items-center">
                        <GiPayMoney className="w-4 h-4 mr-2 text-sky-400" />
                        <p className="text-xs text-gray-600">-{gift.credits}</p>
                    </div>
                    <div className="flex items-center ml-auto">
                        <FaHourglass className="w-4 h-4 mr-2 text-pink-400" />
                        <p className="text-xs text-gray-600">+{gift.exp} </p>
                    </div>
                </div>
                <div className="flex items-end mt-5 mb-0">
                    <GiRobotGrab className="text-xxxs w-4 h-4 mr-1 text-slate-500" />
                    <p className="text-xxxs text-gray-600">Designed by {gift.designer}</p>
                </div>
            </div>
        </div>
    );
};

export default GiftCard;

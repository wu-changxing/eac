import React, { useEffect, useState } from 'react';
import config from '../config';

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
            className="gift-card bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedGift(gift)}
        >
            <img className="w-48 h-48 object-cover rounded-md mb-4" src={`${config.DJ_END}${gift.image.url}`} alt={gift.image.alt} />
            <div>
                <h2 className="font-bold text-lg mb-2">{gift.name}</h2>
                <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: gift.description }} />
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1L15.27 8.25L23 9L17 14.42L18.54 22L12 17.77L5.46 22L7 14.42L1 9L8.73 8.25L12 1Z" fill="currentColor" />
                        </svg>
                        <p className="text-sm text-gray-600">Credits: {gift.credits}</p>
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1L15.27 8.25L23 9L17 14.42L18.54 22L12 17.77L5.46 22L7 14.42L1 9L8.73 8.25L12 1Z" fill="currentColor" />
                        </svg>
                        <p className="text-sm text-gray-600">Exp: {gift.exp}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Designer: {gift.designer}</p>
            </div>
        </div>
    );
};

export default GiftCard;

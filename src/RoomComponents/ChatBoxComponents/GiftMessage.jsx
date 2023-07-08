import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineUser, AiOutlineTrophy, AiOutlineDollarCircle } from 'react-icons/ai';
import config from '../../config';
import { motion, AnimatePresence } from 'framer-motion';

const GiftMessage = ({ message }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const receiver = message.user !== "You"
    const [zIndex, setZIndex] = useState('relative z-0');
    console.log("message is", message)
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        if(receiver){
            setAnimationPlayed(true);
            setZIndex('relative z-50 display');
            setTimeout(() => {
                setAnimationPlayed(false);
                setZIndex('relative z-0');
            }, 200); // 2 seconds delay before it returns to original size and z-index
        }
    }, [receiver]);


    return (
        <motion.div
            className={`bg-gray-100 p-5 m-5 rounded-lg shadow-md transform transition-all duration-300 ${zIndex}`}
            onClick={handleToggleExpand}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: animationPlayed ? 1.5 : 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 2 }}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative">
                {receiver ? (
                    <>
                        <h2 className="font-bold text-2xl mb-2 text-red-500">
                            <AiFillHeart className="inline-block" />
                            {` ${message.user} sent a gift to ${message.gift.to}`}
                        </h2>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto', transition: { duration: 0.5 } }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-start justify-between w-full"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{message.gift.name}</h3>
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <AiOutlineUser className="mr-1" />
                                            <p>{message.gift.from}</p>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <AiOutlineDollarCircle className="mr-1" />
                                            {`${message.gift.credits}`}
                                        </div>
                                        <div className="flex items-center text-gray-600 text-xs">
                                            <AiOutlineTrophy className="mr-1" />
                                            <p>{`Exp+ ${message.gift.exp}`}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div className="rounded-full overflow-hidden mt-4">
                            <img className="h-48 w-48 object-cover" src={`${config.DJ_END}${message.gift.image.url}`} alt={message.gift.image.alt} />
                            <p className="text-gray-600 text-center mb-2" dangerouslySetInnerHTML={{ __html: message.gift.gift.description }} />
                        </motion.div>

                        <p className="absolute bottom-2 right-2 text-gray-600 text-xs">{`Designer: ${message.gift.designer}`}</p>
                    </>
                ) : (
                    <h2 className="font-bold text-2xl mb-2 text-slate-700">
                        <AiFillHeart className="inline-block text-red-500" />
                        {` ${message.user} sent a gift to ${message.to}`}
                    </h2>
                )}
                <div className="absolute bg-white w-4 h-12 -mt-6 transform rotate-45 -bottom-3" />
            </div>
        </motion.div>
    );
};

export default GiftMessage;

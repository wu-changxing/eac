import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineUser, AiOutlineTrophy, AiOutlineDollarCircle } from 'react-icons/ai';
import config from '../../config';
import { motion } from 'framer-motion';

const GiftAniMsg = ({ msg }) => {
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const [zIndex, setZIndex] = useState('fixed z-0');
    const [displayGift, setDisplayGift] = useState(true);

    useEffect(() => {
        setAnimationPlayed(true);
        setZIndex('fixed z-50 display');
        setTimeout(() => {
            setAnimationPlayed(false);
            setZIndex('fixed z-0');
            setDisplayGift(false);
        }, 7000);
    }, []);

    const fadeInSequence = {
        hidden: { opacity: 0, x: '-100%' },
        show: {
            opacity: 1,
            x: '0%',
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.2
            }
        },
        exit: {
            x: '100%',
            opacity: 0,
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1,
                delay: 1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: '-10%', rotateZ: -50 },
        show: { opacity: 1, x: '0%', rotateZ: 0 },
        exit: { opacity: 0, x: '10%', rotateZ: 50 }
    };

    return displayGift ? (
        <motion.div
            className={`p-5 m-5 rounded-lg shadow-md transform transition-all duration-300 ${zIndex} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            initial={{ opacity: 0, scale: 0.1, rotate: -360 }}
            animate={{ opacity: 1, scale: animationPlayed ? 1.3 : 0.8, rotate: 360 }}
            exit={{ opacity: 0, scale: 0, rotate: -360 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative"
                variants={fadeInSequence}
                initial="hidden"
                animate="show"
                exit="exit"
            >
                <motion.div className="rounded-full overflow-hidden mt-4" variants={itemVariants}>
                    <motion.img
                        className="h-48 w-48 object-cover"
                        src={`${config.DJ_END}${msg.gift.image.url}`}
                        alt={msg.gift.image.alt}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                    />
                </motion.div>

                <motion.p
                    className="text-gray-600 text-center mb-2"
                    dangerouslySetInnerHTML={{ __html: msg.gift.gift.description }}
                    variants={itemVariants}
                />

                <motion.div variants={itemVariants}>
                    <motion.h2
                        className="font-bold text-2xl mb-2 text-red-500"
                    >
                        <AiFillHeart className="inline-block" />
                        {` ${msg.user} sent a gift to ${msg.gift.to}`}
                    </motion.h2>

                    <div className="flex items-start justify-between w-full">
                        <div className="flex-1">
                            <motion.h3
                                className="font-bold text-lg"
                            >
                                {msg.gift.name}
                            </motion.h3>
                            <div className="flex items-center text-gray-600 text-xs">
                                <AiOutlineUser className="mr-1" />
                                <p>{msg.gift.from}</p>
                            </div>
                            <div className="flex items-center text-gray-600 text-xs">
                                <AiOutlineDollarCircle className="mr-1" />
                                {`${msg.gift.credits}`}
                            </div>
                            <div className="flex items-center text-gray-600 text-xs">
                                <AiOutlineTrophy className="mr-1" />
                                <p>{`Exp+ ${msg.gift.exp}`}</p>
                            </div>
                        </div>
                    </div>

                    <p className="absolute bottom-2 right-2 text-gray-600 text-xs">{`Designer: ${msg.gift.designer}`}</p>
                    <div className="absolute bg-white w-4 h-12 -mt-6 transform rotate-45 -bottom-3" />
                </motion.div>
            </motion.div>
        </motion.div>
    ) : null;
};

export default GiftAniMsg;

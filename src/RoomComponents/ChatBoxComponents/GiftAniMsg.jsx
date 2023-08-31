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
        setZIndex('fixed z-10 display');
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
            className={`lg:p-5 lg:m-5 m-2 p-2 rounded-xl lg:rounded-md shadow-8xl shadow-pink-400 transform ${zIndex}`}
            initial={{ opacity: 0, scale: 0.1, rotate: -360 }}
            animate={{ opacity: 1, scale: animationPlayed ? 1.3 : 1.0, rotate: 360 }}
            exit={{ opacity: 0, scale: 0, rotate: -360 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-3 md:p-4 lg:p-6 flex flex-col items-center relative"
                variants={fadeInSequence}
                initial="hidden"
                animate="show"
                exit="exit"
            >
                <motion.div className="rounded-full overflow-hidden mt-2 md:mt-3 lg:mt-4" variants={itemVariants}>
                    <motion.img
                        className="h-22 md:h-24 lg:h-32 w-22 md:w-24 lg:w-32 object-cover"
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
                        className="font-bold text-lg md:text-xl lg:text-2xl mb-2 text-red-500"
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
                    <div className="absolute bg-white w-2 md:w-3 lg:w-4 h-6 md:h-8 lg:h-12 -mt-3 md:-mt-4 lg:-mt-6 transform rotate-45 -bottom-1 md:-bottom-2 lg:-bottom-3" />
                </motion.div>
            </motion.div>
        </motion.div>
    ) : null;
};

export default GiftAniMsg;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdNavigateBefore, MdNavigateNext, MdList } from 'react-icons/md';
import config from "../../config";

const FeedPage = ({ feedId, onPrevPage, onNextPage, onReturn }) => {
    const [feed, setFeed] = useState(null);

    useEffect(() => {
        fetchFeed();
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [feedId]);

    const fetchFeed = async () => {
        const response = await fetch(`${config.BACKEND}/api/v2/pages/${feedId}`);
        const data = await response.json();
        setFeed(data);
    };

    const handleNavigation = (navigationFunction) => {
        navigationFunction();
        window.scrollTo(0, 0);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'ArrowLeft') {
            handleNavigation(onPrevPage);
        } else if (event.key === 'ArrowRight') {
            handleNavigation(onNextPage);
        }
    };

    const pageVariants = {
        initial: {
            opacity: 0,
            x: "100vw",
            scale: 0.8
        },
        in: {
            opacity: 1,
            x: 0,
            scale: 1,
            rotate: [0, 180, 360]
        },
        out: {
            opacity: 0,
            x: "-100vw",
            scale: 1.2,
            rotate: [0, -180, -360]
        }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    return (
        feed ? (
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="lg:flex-1 lg:ml-4 mt-10 w-full  lg:w-[599]  text-xl lg:text-lg border-2 p-2"
            >
                <h2 className="text-slate-900">{feed.title}</h2>
                <div>
                    {feed.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="my-6 text-justify text-slate-700">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <div className="flex justify-around mt-10">
                    <button onClick={() => handleNavigation(onPrevPage)} className="p-2  rounded hover:bg-gray-100">
                        <MdNavigateBefore className="text-sky-500" />
                    </button>
                    <button onClick={() => handleNavigation(onReturn)} className="p-2 border border-gray-200 rounded hover:bg-gray-100">
                        <MdList />
                    </button>
                    <button onClick={() => handleNavigation(onNextPage)} className="p-2  rounded hover:bg-gray-100">
                        <MdNavigateNext className='text-sky-500' />
                    </button>
                </div>
            </motion.div>
        ) : <div>Loading...</div>
    );
};

export default FeedPage;

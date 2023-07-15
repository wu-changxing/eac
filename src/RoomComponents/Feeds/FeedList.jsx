import React, { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { motion } from 'framer-motion';
import config from "../../config";
import FeedPage from "./FeedPage";

const FeedList = () => {
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);

    useEffect(() => {
        fetchFeeds();
    }, []);

    const fetchFeeds = async () => {
        const response = await fetch(`${config.BACKEND}/api/v2/feeds`);
        const data = await response.json();
        setFeeds(data.items);
    };

    const fetchRandomFeeds = async () => {
        const response = await fetch(`${config.BACKEND}/api/v2/random-feeds`);
        const data = await response.json();
        setFeeds(data.items);
    };

    const onPrevPage = () => {
        const currentIndex = feeds.findIndex(feed => feed.id === selectedFeed.id);
        if (currentIndex > 0) setSelectedFeed(feeds[currentIndex - 1]);
    }

    const onNextPage = () => {
        const currentIndex = feeds.findIndex(feed => feed.id === selectedFeed.id);
        if (currentIndex < feeds.length - 1) setSelectedFeed(feeds[currentIndex + 1]);
    }

    return (
        selectedFeed ? (
            <FeedPage
                feedId={selectedFeed.id}
                onPrevPage={onPrevPage}
                onNextPage={onNextPage}
                onReturn={() => setSelectedFeed(null)}
            />
        ) : (
            <motion.div
                initial={{ x: 500, opacity: 0, rotateY: 90, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 10, mass: 0.3, restSpeedThreshold: 0.001 }}
                className="lg:flex-1 lg:ml-4 lg:mt-1 lg:w-[599] lg:w-[756]  lg:text-lg"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {feeds.map(feed => (
                        <motion.div
                            whileHover={{ scale: 0.8, rotate: [0, 8, -8, 0] }}

                            transition={{ type: "spring", stiffness: 800, duration: 0.5 }}
                            key={feed.id} className="border-2 shadow text-slate-700 p-4 rounded hover:shadow-lg transition-shadow duration-200"
                        >
                            <h3 onClick={() => setSelectedFeed(feed)} className="font-medium cursor-pointer hover:text-sky-600">{feed.title}</h3>
                        </motion.div>
                    ))}
                    <motion.div
                        onClick={fetchRandomFeeds}
                        whileHover={{ scale: 1.1, rotate: [0, 0.5, -0.5, 0] }}
                        transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
                        className="border-2 shadow text-slate-700 p-4 rounded hover:shadow-lg transition-shadow duration-200 cursor-pointer flex items-center justify-center"
                    >
                        <AiOutlineReload className="mr-2 text-sky-500" />
                        <h3 className="font-medium text-center">Refresh</h3>
                    </motion.div>
                </div>
            </motion.div>
        )
    );
};

export default FeedList;

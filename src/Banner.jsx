import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import config from "./config";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar } from "react-icons/fa";
import bannerBG from "../assets/background/allparrots.webp";

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [activeBanner, setActiveBanner] = useState(0);
    const [previousBanner, setPreviousBanner] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const variants = {
        hidden: { opacity: 0, x: 200, rotateY: -90 },
        visible: { opacity: 1, x: 0, rotateY: 0 },
        exit: { opacity: 0, x: -200, rotateY: 90 }
    };

    useEffect(() => {
        let timer = null;

        if (!isModalOpen) {
            timer = setInterval(() => {
                setPreviousBanner(banners[activeBanner]);
                setActiveBanner((prevBanner) => (prevBanner + 1) % banners.length);
            }, 3000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [banners, activeBanner, isModalOpen]);

    useEffect(() => {
        fetch(`${config.DJ_END}/api/v2/pages/?child_of=75`)
            .then((res) => res.json())
            .then((data) => {
                const sortedItems = data.items.sort((a, b) => new Date(b.meta.first_published_at) - new Date(a.meta.first_published_at));
                setBanners(sortedItems.slice(0, 4));
            })
            .catch((error) => console.log(error));
    }, []);


    const handleBannerClick = (url) => {
        const bannerId = banners[activeBanner].id;

        fetch(`${config.DJ_END}/api/v2/pages/${bannerId}/`)
            .then((res) => res.json())
            .then((data) => {
                setModalContent(data);
            })
            .catch((error) => console.log(error));

        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const setActiveBannerIndex = (index) => {
        setActiveBanner(index);
        setIsModalOpen(false);
    };

    const getBackgroundImage = (banner) => {
        return banner && banner.cover_image ? `url(${banner.cover_image})` : `url(${bannerBG})`;
    };

    if (!banners.length) {
        return null;
    }

    return (
        <div className="relative w-full h-64 md:h-96 lg:p-8 py-5 mb-10 lg:h-128">
            {!isModalOpen && (
                <AnimatePresence>
                    {previousBanner && (
                        <motion.div
                            key={previousBanner.id}
                            className="absolute w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: getBackgroundImage(previousBanner) }}
                            variants={variants}
                            initial="visible"
                            animate="exit"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 shadow-sky-700 shadow-md to-transparent p-6 md:p-10 lg:p-16">
                                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white">{banners[activeBanner].title}</h1>
                                <p className="mt-2 text-lg md:text-xl lg:text-2xl text-white">{new Date(banners[activeBanner].date).toLocaleDateString()}</p>
                            </div>
                        </motion.div>
                    )}
                    <motion.div
                        key={banners[activeBanner].id}
                        className="absolute w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: getBackgroundImage(banners[activeBanner]) }}
                        onClick={() => handleBannerClick(banners[activeBanner].meta.html_url)}
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 shadow-sky-700 border-b border-pink-500 shadow-lg to-transparent p-6 md:p-10 lg:p-16">
                            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white">
                                {banners[activeBanner].title}
                            </h1>
                            <div className="flex items-center mt-2">
                                <FaCalendar className="mr-2 text-xl text-white" />
                                <p className="text-lg md:text-xl lg:text-2xl text-white">
                                    {new Date(banners[activeBanner].meta.first_published_at).toLocaleDateString()}
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
            {isModalOpen && modalContent && (
                <div className="fixed inset-0 flex items-center justify-center z-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                    <div className="relative bg-white rounded-lg shadow-lg overflow-y-auto max-h-full md:max-h-96 w-full md:w-2/3 lg:w-1/2">
                        <div className="flex justify-between items-center sticky top-0 bg-white px-4 py-2 sm:px-6 md:px-8">
                            <h2 className="text-xl sm:text-2xl font-bold">
                                {modalContent.title}
                                <a href={modalContent.meta.html_url}>
                    <span className="text-xs sm:text-base text-gray-600 ml-2">
                        点此查看告原文链接
                    </span>
                                </a>
                            </h2>

                            <button className="text-gray-500 hover:text-red-500 p-3" onClick={handleCloseModal}>
                                <MdClose size={24} className="text-xl"/>
                            </button>
                        </div>
                        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl px-4 sm:px-6 md:px-8 py-4">
                            {modalContent.meta.type === "flex.Engineer" && modalContent.content.map((contentItem) => {
                                if (contentItem.type === "paragraph" && contentItem.value[0].type === "title") {
                                    return (
                                        <h2 key={contentItem.id} className="text-2xl font-bold">
                                            {contentItem.value[0].value}
                                        </h2>
                                    );
                                } else if (contentItem.type === "simple_richtext" || contentItem.type === "full_richtext") {
                                    return (
                                        <div
                                            key={contentItem.id}
                                            dangerouslySetInnerHTML={{__html: contentItem.value}}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            {modalContent.meta.type !== "flex.Engineer" && (
                                <div dangerouslySetInnerHTML={{__html: modalContent.body}}/>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!isModalOpen && (
                <div className="absolute bottom-10 left-10 right-10 flex justify-center space-x-4 p-4">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveBannerIndex(index)}
                            className={`w-8 h-1 transition-opacity duration-200 rounded ${activeBanner === index ? "bg-white" : "bg-white opacity-50 hover:opacity-75"}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banner;

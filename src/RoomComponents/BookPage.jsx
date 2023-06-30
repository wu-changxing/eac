import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    MdNavigateBefore,
    MdNavigateNext,
    MdList,
    MdFileDownload,
    MdArrowBack,
} from 'react-icons/md';
import { AiFillFilePdf } from 'react-icons/ai';
import { FcKindle } from 'react-icons/fc';
import { MdOutlineAttachFile } from 'react-icons/md';
import config from "../config";

const BookPage = ({ bookId, onPrevPage, onNextPage, onReturn }) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetchBook();
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [bookId]);

    const fetchBook = async () => {
        const response = await fetch(`${config.BACKEND}/api/v2/pages/${bookId}`);
        const data = await response.json();
        setBook(data);
    };

    const handleNavigation = (navigationFunction) => {
        navigationFunction();
        window.scrollTo(0, 0);
    };

    const getExtension = (meta) => {
        const extension = meta.download_url.split('.').pop().toLowerCase();
        return extension;
    };

    const getFileIcon = (meta) => {
        const extension = getExtension(meta);
        if (extension === 'pdf') {
            return <AiFillFilePdf className="text-red-500 text-2xl hover:text-white" />;
        } else if (extension === 'mobi') {
            return <FcKindle className="text-sky-500 text-2xl hover:text-white" />;
        } else if (extension === 'epub') {
            return <MdOutlineAttachFile className="text-pink-500 text-2xl hover:text-white" />;
        } else {
            return <MdFileDownload className="text-sky-500 text-2xl hover:text-white" />;
        }
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
            scale: 0.8,
        },
        in: {
            opacity: 1,
            x: 0,
            scale: 1,
            rotate: [0, 180, 360],
        },
        out: {
            opacity: 0,
            x: "-100vw",
            scale: 1.2,
            rotate: [0, -180, -360],
        },
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5,
    };

    return book ? (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="lg:flex-1 lg:ml-4 mt-10 w-full  lg:w-[599]  text-xl lg:text-lg border-2 p-2"
        >
            <h2 className="text-slate-900">{book.title}</h2>
            <div>
                {book.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="my-6 text-justify text-slate-700">
                        {paragraph}
                    </p>
                ))}
            </div>
            <button className="flex items-center cursor-pointer hover:text-white">
                <a
                    href={book.attachment.download_url}
                    download
                    className="bg-white border border-sky-500 text-sky-500 p-2 rounded hover:bg-sky-500 hover:text-white flex items-center"
                >
                    {getFileIcon(book.attachment.meta)}
                    <span className="p-2 text-xl mx-2">{book.attachment.title + "." + getExtension(book.attachment.meta)}</span>
                </a>
            </button>
            <div className="flex justify-around mt-10">
                <button
                    onClick={() => handleNavigation(onPrevPage)}
                    className="p-2 rounded hover:bg-gray-100"
                >
                    <MdNavigateBefore className="text-sky-500 text-2xl" />
                </button>
                <button
                    onClick={() => handleNavigation(onReturn)}
                    className="p-2 border border-gray-200 rounded hover:bg-gray-100"
                >
                    <MdArrowBack className="text-sky-500 text-2xl" />
                </button>
                <button
                    onClick={() => handleNavigation(onNextPage)}
                    className="p-2 rounded hover:bg-gray-100"
                >
                    <MdNavigateNext className='text-sky-500 text-2xl' />
                </button>
            </div>
        </motion.div>
    ) : <div>Loading...</div>;
};

export default BookPage;

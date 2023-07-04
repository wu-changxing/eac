import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsCalendar } from 'react-icons/bs';
import config from "../config";
import BookPage from "./BookPage";
import {AiFillBook} from "react-icons/ai";
import {GiBlackBook} from "react-icons/gi";
import {FaRegBookmark} from "react-icons/fa";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await fetch(`${config.BACKEND}/api/v2/books`);
        const data = await response.json();
        setBooks(data.items);
    };

    const onPrevPage = () => {
        const currentIndex = books.findIndex((book) => book.id === selectedBook.id);
        if (currentIndex > 0) setSelectedBook(books[currentIndex - 1]);
    };

    const onNextPage = () => {
        const currentIndex = books.findIndex((book) => book.id === selectedBook.id);
        if (currentIndex < books.length - 1) setSelectedBook(books[currentIndex + 1]);
    };

    return selectedBook ? (
        <BookPage
            bookId={selectedBook.id}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onReturn={() => setSelectedBook(null)}
        />
    ) : (
        <motion.div
            initial={{ x: 500, opacity: 0, rotateY: 90, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 10, mass: 0.3, restSpeedThreshold: 0.001 }}
            className="lg:flex-1 lg:ml-4 lg:mt-1 lg:w-[599] lg:w-[756]  lg:text-lg space-y-4"
        >
            <div className="flex items-center">
                <span className="text-xl font-bold mr-2">今日书籍推荐</span>
                <span className="rounded-full bg-pink-500 text-white px-2 py-1 flex items-center shadow-pink-900 shadow-xl">
                    <span className="mr-1">
                        <FaRegBookmark className="text-2xl rounded-xl" />
                    </span>
                    {new Date().toLocaleDateString()}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                    <motion.div
                        whileHover={{ scale: 0.8, rotate: [0, 8, -8, 0] }}
                        transition={{ type: "spring", stiffness: 800, duration: 0.5 }}
                        key={book.id}
                        className="border-2 border-gray-300 shadow-md text-slate-700 p-4 rounded hover:shadow-lg transition-shadow duration-200"
                        onClick={() => setSelectedBook(book)}
                    >
                        <h3 className="font-medium cursor-pointer  hover:text-sky-600">
                            <AiFillBook className="text-3xl shadow-pink-400 shadow-xl rounded-full mr-1 " />
                            「{book.title}」
                        </h3>
                        <p>{book.introduction}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default BookList

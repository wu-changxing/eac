import React from 'react';
import { GiStaticWaves } from 'react-icons/gi';
import { FaUserPlus, FaRegWindowClose } from 'react-icons/fa';

const JoinQuiz = ({ joinQuiz, onClose }) => {
    return (
        <div className="max-w-sm mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden m-4">
            <div className="sm:flex sm:items-center px-6 py-4">
                <GiStaticWaves className="mr-4 mb-2 sm:mb-0 sm:mr-6 text-gray-900 bg-sky-300 rounded-full p-2" size={48} />
                <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Quiz Invitation</h1>
                    <p className="text-sm text-gray-600">Admin has started a quiz. Click the button to join:</p>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-200 border-t border-gray-300">
                <button
                    onClick={joinQuiz}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    <FaUserPlus className="mr-2" />
                    Join Quiz
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <FaRegWindowClose className="mr-2" />
                    I don't want to join
                </button>
            </div>
        </div>
    );
}

export default JoinQuiz;

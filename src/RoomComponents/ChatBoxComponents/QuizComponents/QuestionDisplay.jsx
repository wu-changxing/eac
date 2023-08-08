import React from 'react';
import { FaBook, FaHeadphones, FaFlag, FaClock } from 'react-icons/fa';

const QuestionDisplay = ({ question, handleOptionClick, timer, timeLength, selectedOption }) => {
    return (
        <>
            <h2 className="text-2xl mb-4 text-sky-500">{question.id}</h2>
            <div className="border-b-2 border-sky-500 pb-4 mb-4 flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                    <FaBook className="mr-2" />
                    <p className="font-bold text-lg"> {question.question}</p>
                    <div className="flex items-center text-gray-600">
                        {question.ipa}
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FaFlag className="mx-3" />{question.level}
                    </div>
                </div>
            </div>
            <div className="flex items-center text-gray-600 my-1">
                <FaClock className="mr-1" /> Timer: {timer}s
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mb-4">
                <div className="h-2 bg-sky-500 rounded" style={{ width: `${(timer / timeLength) * 100}%` }}></div>
            </div>
            <div className="flex flex-col space-y-4">
                {question.options.map((optionObj, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 rounded ${selectedOption === optionObj.option ? 'bg-sky-500 text-white' : 'border border-sky-500 text-sky-500'} hover:bg-sky-700 hover:text-white`}
                        onClick={() => handleOptionClick(optionObj.option)}
                    >
                        <FaHeadphones className="mr-1" /> {optionObj.option}
                    </button>
                ))}
            </div>
        </>
    );
};

export default QuestionDisplay;

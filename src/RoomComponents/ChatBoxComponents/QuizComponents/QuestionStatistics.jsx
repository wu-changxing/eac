import React, { useState } from 'react';
import AnswerDisplay from "./answerDisplay";
import {FaCheckCircle, FaTimesCircle, FaCrown, FaQuestionCircle} from 'react-icons/fa';
import useRoomStore from "../../../useRoomStore";

const QuestionStatistics = ({ stats,tab, answer, handleNextQuestion }) => {
    const [activeTab, setActiveTab] = useState(tab);
    const { isAdmin } = useRoomStore();

    // sort the stats array by score in descending order
    const sortedStats = [...stats].sort((a, b) => b.score - a.score);

    return (
        <div className="px-8 py-6 bg-sky-600 text-white rounded-lg shadow-md max-h-96 overflow-auto mx-2">
            <div className="flex mb-4 bg-white rounded-md shadow-md overflow-hidden">
                <button
                    onClick={() => setActiveTab('statistics')}
                    className={`mr-1 text-xl font-bold transition-colors duration-200 ease-in-out 
                    ${activeTab === 'statistics' ? 'text-sky-500 bg-white px-4 py-2 border-sky-500 border-2' : 'text-sky-400 hover:text-sky-900  px-2 py-1'}`}
                >
                    Statistics
                </button>
                <button
                    onClick={() => setActiveTab('answer')}
                    className={`text-xl font-bold transition-colors duration-200 ease-in-out 
                    ${activeTab === 'answer' ? 'text-sky-500 bg-white px-4 py-2 border-sky-500 border-2' : 'text-sky-400 hover:text-sky-900 px-2 py-1 '}`}
                >
                    Answer
                </button>
            </div>
            {activeTab === 'statistics' ? (
                <div className="space-y-4">
                    {sortedStats.map((stat, index) => (
                        <div key={stat.username} className="flex items-center justify-between border-b border-sky-400 py-2">
                            <div className="flex items-center">
                                {(index === 0 || index === 1 || index === 2) && <FaCrown className="mr-2 text-yellow-300"/>}
                                <div>
                                    <p className="text-lg font-semibold">{index + 1}. {stat.username}</p>
                                    <p className="text-sm">Score: {stat.score}</p>
                                </div>
                            </div>
                            <div>
                                {stat.isAnswered ? (
                                    stat.isCorrect ? (
                                        <div className="flex items-center text-green-400">
                                            <FaCheckCircle className="mr-2" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-400">
                                            <FaTimesCircle className="mr-2" />
                                        </div>
                                    )
                                ) : (
                                    <div className="flex items-center text-indigo-400">
                                        <FaQuestionCircle className="mr-2" />
                                        <p className="text-sm text-white">not submitted yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isAdmin && (
                        <button
                            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow"
                            onClick={handleNextQuestion}
                        >
                            Next Question
                        </button>
                    )}
                </div>
            ) : (
                <AnswerDisplay answer={answer.answer} correct={answer.isCorrect} handleNextQuestion={handleNextQuestion} />
            )}
        </div>
    );
};

export default QuestionStatistics;

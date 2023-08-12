// src/RoomComponents/ChatBoxComponents/answerDisplay.jsx
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaHeadphones } from 'react-icons/fa';
import { GiBookshelf, GiRootTip } from 'react-icons/gi';
import { BsBarChartSteps } from 'react-icons/bs';
import useRoomStore from "../../../useRoomStore";
const AnswerDisplay = ({ answer, correct, handleNextQuestion }) => {
    const { isAdmin } = useRoomStore();
    const emphasizeWord = (sentence, word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        return sentence.replace(regex, (match) => `<span class="font-bold text-xl text-sky-500">${match}</span>`);
    };

    return (
        <div className="p-5 rounded space-y-4 bg-white text-slate-700">
            <div className={`flex items-center space-x-2 ${correct ? 'text-green-500' : 'text-red-500'}`}>
                {correct ? <FaCheckCircle /> : <FaTimesCircle />}
                <h2 className="font-bold text-xl">{correct ? 'Correct answer!' : 'Wrong answer!'}</h2>
            </div>

            <div className="space-y-2">
                {/* TODO: Add test feature */}
                <h3 className="font-bold text-lg">
                    {answer.id} : <span className="text-sky-500">{answer.question}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p>
                        <FaHeadphones className="inline-block text-sky-500" />{' '}
                        <span className="font-semibold">{answer.ipa}</span>
                    </p>
                    <p>
                        <GiRootTip className="inline-block text-sky-500" /> root:{' '}
                        <span className="font-semibold">{answer.root}</span>
                    </p>
                    <p>
                        <GiBookshelf className="inline-block text-sky-500" />{' '}
                        <span>{answer.word_type}</span>
                    </p>
                    <p>
                        <BsBarChartSteps className="inline-block text-sky-500" />{' '}
                        <span className="font-semibold">{answer.level}</span>
                    </p>
                </div>
                <p>
                    <span className="border-1">{answer.chinese_guide}</span>
                </p>

                {answer.meanings.map((meaning, index) => (
                    <div key={index} className="space-y-2">
                        <h4 className="font-semibold text-sky-500">{meaning.partOfSpeech}:</h4>
                        {meaning.definitions.map((definition, defIndex) => (
                            <div key={defIndex} className="space-y-2">
                                <p>{definition.definition}</p>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: emphasizeWord(definition.example.sentence, answer.question),
                                    }}
                                />
                                <p>{definition.example.translation}</p>
                            </div>
                        ))}
                    </div>
                ))}

                <h3 className="font-bold text-lg">Examples:</h3>
                {answer.sentences.map((sentence, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: emphasizeWord(sentence, answer.question) }} />
                ))}
            </div>

            {isAdmin && (
                <button
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow"
                    onClick={handleNextQuestion}
                >
                    Next Question
                </button>
            )}
        </div>
    );
};

export default AnswerDisplay;

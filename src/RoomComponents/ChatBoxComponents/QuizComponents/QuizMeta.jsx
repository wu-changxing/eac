// src/RoomComponents/ChatBoxComponents/QuizMeta.jsx
import React, {useState} from 'react';
import {FaClock, FaTrophy, FaChalkboardTeacher, FaUserFriends, FaPlay, FaTimes} from 'react-icons/fa';
import {GiCheckMark, GiTimeBomb, GiSpearHook, GiSwordsPower, GiBookshelf, GiGraduateCap} from 'react-icons/gi';
import {useParams} from "react-router-dom";

const QuizMeta = ({socket, onClose, setMode}) => {
    const roomId = useParams().roomId;
    const [localSelection, setLocalSelection] = useState({
        level: "1",
        category: "IELTS",
        mode: "single",
        timer: 10,
        room_id: roomId,
    });

    const handleLocalChange = (e) => {
        setLocalSelection({
            ...localSelection,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        setMode(localSelection.mode);
        socket.emit('initQuestions', localSelection);
        console.log(localSelection);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <button
                className="absolute top-2 right-2 bg-gray-800 hover:bg-red-700 text-white font-bold p-1 rounded"
                onClick={onClose}
            >
                <FaTimes/>
            </button>
            <div className="w-full max-w-sm p-2 flex items-center space-x-2">
                <GiGraduateCap className="text-sky-500 text-3xl mr-2"/>
                <select
                    name="level"
                    onChange={handleLocalChange}
                    className="w-full p-2 rounded border border-gray-300"
                    value={localSelection.level}
                >
                    <option value="1">非常简单</option>
                    <option value="2">简单</option>
                    <option value="3">中等</option>
                    <option value="4">罕见</option>
                    <option value="5">非常罕见</option>
                </select>
            </div>

            <div className="w-full max-w-sm p-2 flex items-center space-x-2">
                <GiBookshelf className="text-sky-500 text-3xl mr-2"/>
                <select
                    name="category"
                    onChange={handleLocalChange}
                    className="w-full p-2 rounded border border-gray-300"
                    value={localSelection.category}
                >
                    <option value="IELTS">IELTS</option>
                    {/*<option value="CET6">CET6</option>*/}
                    {/*<option value="考研">考研</option>*/}
                    <option value="PTE">PTE</option>
                    {/*<option value="TOEFL">TOEFL</option>*/}
                    {/*<option value="GRE">GRE</option>*/}
                    {/*<option value="GMAT">GMAT</option>*/}
                    <option value="SAT">SAT</option>
                    {/*<option value="高考">高考</option>`*/}

                </select>
            </div>

            <div className="w-full max-w-sm p-2 flex items-center space-x-2">
                <GiSwordsPower className="text-sky-500 text-3xl mr-2"/>
                <select
                    name="mode"
                    onChange={handleLocalChange}
                    className="w-full p-2 rounded border border-gray-300"
                    value={localSelection.mode}
                >
                    <option value="single">Single user</option>
                    <option value="public">People in room</option>
                </select>
            </div>

            <div className="w-full max-w-sm p-2 flex items-center justify-between space-x-2">
                <label htmlFor="timer" className="flex items-center space-x-2">
                    <GiTimeBomb className="text-sky-500 text-3xl mr-2"/>
                    <span className="text-gray-800">Timer (for each Question)</span>
                </label>
                <input
                    type="range"
                    name="timer"
                    min="1"
                    max="120"
                    value={localSelection.timer || 1}
                    onChange={handleLocalChange}
                    className="w-1/2 h-1 rounded-full bg-sky-200 appearance-none hover:bg-sky-400 active:bg-sky-500 transition-colors duration-200"
                />
                <div className="font-bold text-sky-500">{localSelection.timer || 1}s</div>
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                <GiCheckMark className="mr-2"/>
                Start Quiz
            </button>
        </div>
    );
};

export default QuizMeta;

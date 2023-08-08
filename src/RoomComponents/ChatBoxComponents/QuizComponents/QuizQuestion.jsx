import React, {useEffect, useState} from 'react';
import {FaTimes, FaBook, FaHeadphones, FaFlag, FaClock} from 'react-icons/fa';
import AnswerDisplay from './answerDisplay';
import QuestionStatistics from "./QuestionStatistics";
import QuestionDisplay from './QuestionDisplay';

const QuizQuestion = ({question,onClose, socket, roomId, mode}) => {
    const [answer, setAnswer] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [stats, setStats] = useState(null);
    const [view, setView] = useState('question');
    const [timer, setTimer] = useState(30);
    const [timeLength, setTimeLength] = useState(30);
    const nextQuestion = () => {
        socket.emit('nextQuestion', {room_id: roomId, question_timer: timeLength});
        setView('question');
    }

    useEffect(() => {
        if (timer > 0 && question) {
            const timeout = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timeout);
        } else if (question && socket) {
            // socket.emit('nextQuestion');
            setTimer(timeLength);
        }
    }, [timer, question, socket]);
    useEffect(() => {
        socket.on('question', data => {
            setTimeLength(data.timer || 30);
            setTimer(data.timer || 30);
            setAnswer(null);
            setSelectedOption(null);
            setView('question');
        });
        return () => {
            // clean up the listener when the component is unmounted
            socket.off('questionView');
        };
    }, [socket]);

    useEffect(() => {
        socket.on('checkAnswer', data => {
            setAnswer(data);
            setView('answer');
        });
        socket.on('stats', statsData => {
            setStats(statsData);
            if (mode === 'single') {
                setView('question');
            } else {
                setView('stats');
            }
        });
        return () => {
            // clean up the listener when the component is unmounted
            socket.off('checkAnswer');
            socket.off('stats');
        };
    }, []);  // Add 'view' as a dependency to the useEffect hook

    useEffect(() => {
        socket.on('receivedAnswer', data => {
            if (view === 'stats') {
                socket.emit('getStats', {room_id: roomId});
            }
        });
        return () => {
            // clean up the listener when the component is unmounted
            socket.off('receivedAnswer');
        }
    }, [view]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        handleSubmit(option);
    };

    const handleSubmit = (option) => {
        socket.emit('submitAnswer', {questionId: question.id, selectedOption: option, room_id: roomId});
        socket.emit('getStats', {room_id: roomId});
    };

    return (<div
        className="relative bg-white shadow-md rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl mx-auto">
        <button
            className="absolute top-2 right-2 bg-gray-800 hover:bg-red-700 text-white font-bold p-1 rounded"
            onClick={onClose}
        >
            <FaTimes/>
        </button>
        {view === 'stats' && (
            <QuestionStatistics stats={stats} setShowAnswer={setView.bind(null, 'answer')} answer={answer}
                                handleNextQuestion={nextQuestion}/>)}
        {view === 'answer' && (<AnswerDisplay answer={answer.answer} correct={answer.isCorrect}
                                              handleNextQuestion={nextQuestion}/>)}
        {view === 'question' && question && (<QuestionDisplay
            question={question}
            handleOptionClick={handleOptionClick}
            timer={timer}
            timeLength={timeLength}
            selectedOption={selectedOption}
        />)}
    </div>);
};

export default QuizQuestion;

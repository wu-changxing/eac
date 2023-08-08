// src/RoomComponents/ChatBoxComponents/Quiz.jsx
import React, {useState, useEffect} from 'react';
import QuizQuestion from "./QuizQuestion";
import QuizMeta from "./QuizMeta";
import QuizResults from "./QuizResults";
import {useParams} from "react-router-dom";
import useRoomStore from "../../../useRoomStore";
import {FaRegWindowClose, FaSignInAlt, FaTimes, FaUserPlus} from "react-icons/fa";
import {GiStaticWaves} from "react-icons/gi";
import JoinQuiz from "./JoinQuiz";

const Quiz = ({QuizClose, setMessages, socket, users}) => {
    const [view, setView] = useState('meta');
    const [results, setResults] = useState(null);
    const [mode, setMode] = useState(null);

    const [question, setQuestion] = useState(null);
    const roomId = useParams().roomId;
    const isAdmin = useRoomStore(state => state.isAdmin);

    const onClose = () => {
        setView('meta');
        QuizClose();
    }
    useEffect(() => {
        if (socket) {
            socket.on('question', data => {
                setQuestion(data);
                console.log('question', data);
                setView(view => 'question');

            });
            socket.on('endQuiz', data => {
                setResults(data);
                setView('results');
            });
            return () => {
                socket.off('question');
                socket.off('endQuiz');
            }
        }
    }, [socket]);


    const joinQuiz = () => {
        socket.emit('joinQuiz', {room_id: roomId});
    }


    switch (view) {
        case 'question':
            return (
                <QuizQuestion
                    question={question}
                    socket={socket}
                    roomId={roomId}
                    onClose={onClose}
                    mode={mode}
                />
            );
        case 'results':
            return (
                <QuizResults
                    results={results}
                    onClose={onClose}
                />
            );
        case 'meta':
            return (
                isAdmin
                    ? <QuizMeta socket={socket} onClose={onClose} setMode={setMode} />
                    : <JoinQuiz joinQuiz={joinQuiz} onClose={onClose} />
            );
        default:
            return (
                     <JoinQuiz joinQuiz={joinQuiz} onClose={onClose} />
            );

    }
};

export default Quiz;

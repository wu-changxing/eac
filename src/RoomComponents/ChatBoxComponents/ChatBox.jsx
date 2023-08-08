import React, {useState, useEffect, useRef, useContext} from 'react';
import {FaComments, FaPaperPlane, FaFileImage, FaFileAlt} from 'react-icons/fa';
import {SocketContext} from '../../SocketContext';

import ChatFeatures from "./ChatFeatures";
import {useTransition, animated} from 'react-spring';
import GiftMessage from "./GiftMessage";
import Quiz from "./QuizComponents/Quiz";
const ChatBox = ({showChatBox, dispatch, unreadMessages, users}) => {
    const {state} = useContext(SocketContext);
    const {socket} = state;
    const [messages, setMessages] = useState([]);
    const endOfChatRef = useRef(null);
    const transitions = useTransition(showChatBox, {
        from: {
            opacity: 0,
            transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)'
        }, enter: {
            opacity: 1,
            transform: 'perspective(600px) translate3d(0%,0,0) rotateY(0deg) scale(1)',
            boxShadow: '0px 30px 50px rgba(0, 0, 0, 0.4)',
            config: {friction: 18}
        }, leave: {
            opacity: 0,
            transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
            config: {duration: 5}
        }, config: {mass: 1, tension: 280, friction: 20, precision: 0.00001},
    });
    const [showQuiz, setShowQuiz] = useState(false);
    useEffect(() => {
        if (showChatBox && unreadMessages.length > 0) {
            setMessages(prevMessages => [...prevMessages, ...unreadMessages]);
            dispatch({type: 'SET_UNREAD_MESSAGES', payload: []});
        }
    }, [showChatBox, dispatch, unreadMessages]);

    useEffect(() => {
        if (socket) {
            socket.on('room_chat_msg', (message) => {
                if (!showChatBox) {
                    dispatch({type: 'SET_UNREAD_MESSAGES', payload: [...unreadMessages, message]});
                } else {
                    setMessages(prevMessages => [...prevMessages, message]);
                }
            });
            socket.on('room_chat_img', (message) => {
                setMessages(prevMessages => [...prevMessages, message]);
            });
            socket.on('room_chat_file', (message) => {
                const {file, filename, filetype} = message;
                const blob = new Blob([new Uint8Array(file).buffer], {type: filetype});
                message.fileURL = URL.createObjectURL(blob);
                setMessages(prevMessages => [...prevMessages, message]);
            });
            socket.on('receive_gift', (message) => {
                if (!showChatBox) {
                    console.log('unreadMessages', unreadMessages);
                    dispatch({type: 'SET_UNREAD_MESSAGES', payload: [...unreadMessages, message]});
                } else {
                    setMessages(prevMessages => [...prevMessages, message]);
                }
            });
            socket.on('showQuiz', () => {
                console.log('showQuiz');
                setShowQuiz(true);
            });
        }
        return () => {
            if (socket) {
                socket.off('room_chat_msg');
                socket.off('room_chat_img');
                socket.off('room_chat_file');
            }
        };
    }, [socket, showChatBox, dispatch, unreadMessages]);

    useEffect(() => {
        if (endOfChatRef.current) {
            endOfChatRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return transitions((style, item) => item && <animated.div
        style={style}
        className={`flex flex-col mt-4 h-[600px] lg:w-[599] lg:h-[756] p-4 bg-gray-50 border border-gray-300 rounded-md`}
    >
        <div className="overflow-auto mb-4 flex flex-col space-y-4 flex-grow">
            <div className="flex items-center font-bold text-lg mb-2">
                <FaComments className="mr-2 text-sky-500 "/>
                Chat
            </div>
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex flex-col border-2 border-sky-500 gap-1 my-2 text-gray-800 p-2 rounded-md ${
                        message.user === 'You' ? 'bg-sky-300 text-white ml-auto' : 'bg-white text-gray-500 mr-auto'
                    } ${message.user === 'You' ? 'max-w-70' : 'max-w-99'} sm:max-w-70`}
                >
                <span className="text-sm font-bold text-sky-500">{message.user}</span>
                {message.message && <span className="text-slate-700 text-lg">{message.message}</span>}
                {message.gift && <GiftMessage message={message}/>}
                {message.image && <img src={message.image} alt="sent content"/>}
                {message.file && (
                    <div className="flex items-center space-x-2 border-2 shadow-lg p-2 rounded-md bg-white">
                        <FaFileAlt className="text-sky-500" />
                        <a
                            href={message.fileURL}
                            download={message.filename}
                            className="underline text-sky-500 hover:text-sky-600 overflow-hidden whitespace-wrap break-all"
                            style={{ maxWidth: '200px' }} // Set the maximum width to wrap long file names
                        >
                            {message.filename}
                        </a>
                    </div>
                )}

            </div>))}
            {showQuiz && (
                <Quiz
                    QuizClose={() => setShowQuiz(false)} // so you can close the quiz
                    setMessages={setMessages}
                    socket={socket}
                    users={users}
                />
            )}


            <div ref={endOfChatRef}></div>
        </div>
        <ChatFeatures messages={messages} setMessages={setMessages} socket={socket} users={users} setShowQuiz={setShowQuiz} />
    </animated.div>);
};

export default ChatBox;

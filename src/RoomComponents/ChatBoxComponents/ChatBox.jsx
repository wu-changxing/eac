import React, {useState, useEffect, useRef, useContext} from 'react';
import {FaComments, FaPaperPlane, FaFileImage, FaFileAlt} from 'react-icons/fa';
import {SocketContext} from '../../SocketContext';

import ChatFeatures from "./ChatFeatures";
import {useTransition, animated} from 'react-spring';
import GiftMessage from "./GiftMessage";
import Quiz from "./QuizComponents/Quiz";
import useRoomStore from '../../useRoomStore';  // Import your Zustand store
import {IoPin} from "react-icons/io5";
import {AiTwotonePushpin} from "react-icons/ai";
import Message from "./Message";  // Import the Pin icon
const ChatBox = ({users}) => {
    const {state} = useContext(SocketContext);

    const {socket} = state;
    const { unreadMessages, addUnreadMessage, setUnreadMessages, showChatBox } = useRoomStore((state) => ({
        unreadMessages: state.unreadMessages,
        addUnreadMessage: state.addUnreadMessage,
        setUnreadMessages: state.setUnreadMessages,
        showChatBox: state.showChatBox  // Make sure this is identical to the Zustand state name
    }));

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
    const username = localStorage.getItem('username');
    const isAdmin = useRoomStore((state) => state.isAdmin);
    const roomId = useRoomStore((state) => state.roomId);


    const handlePinMessage = (message) => {
        if (isAdmin) {  // Check if the user is an admin
            socket.emit('pin_message', { room_id: roomId, message: message });  // Replace YOUR_ROOM_ID with the actual room ID
        }
    }
    useEffect(() => {
        if (showChatBox && unreadMessages.length > 0) {
            setMessages(prevMessages => [...prevMessages, ...unreadMessages]);
        }
    }, [showChatBox,  unreadMessages]);

    useEffect(() => {
        if (socket) {
            socket.on('room_chat_msg', (message) => {
                if (!showChatBox) {
                    addUnreadMessage(message);
                }
                    setMessages(prevMessages => [...prevMessages, message]);
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
                    addUnreadMessage(message);
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
    }, [socket, showChatBox]);

    useEffect(() => {
        if (endOfChatRef.current) {
            endOfChatRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return transitions((style, item) => item && <animated.div
        style={style}
        className={`flex flex-col mt-4 h-[600px] lg:w-[599] lg:h-[756] p-2 md:p-4 bg-gray-50 border border-gray-300 rounded-md`}
    >
        <div className="overflow-auto mb-4 flex flex-col space-y-4 flex-grow">
            <div className="flex items-center font-bold text-lg mb-2">
                <FaComments className="mr-2 text-sky-500 "/>
                Chat
            </div>
            {messages.map((message, index) => (
                <Message
                    key={index}
                    message={message}
                    messages={messages}
                    setMessages={setMessages}
                />
            ))}
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

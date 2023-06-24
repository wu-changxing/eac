import React, {useState, useEffect, useRef, useContext} from 'react';
import {FaComments, FaPaperPlane, FaFileImage} from 'react-icons/fa';
import {SocketContext} from '../SocketContext';
import {useParams} from 'react-router-dom';
import {useTransition, animated} from 'react-spring';

const ChatBox = ({showChatBox, dispatch, unreadMessages}) => {
    const {state} = useContext(SocketContext);
    const {socket} = state;
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [previewURL, setPreviewURL] = useState(null);
    const endOfChatRef = useRef(null);
    const {roomId} = useParams();
    const fileInputRef = useRef();
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
        },

        config: {mass: 1, tension: 280, friction: 20, precision: 0.00001},
    });


    const handleImageSelect = (event) => {
        if (previewURL) URL.revokeObjectURL(previewURL);  // If there is an old preview URL, revoke it
        const file = event.target.files[0];
        setSelectedImage(file);
        setPreviewURL(URL.createObjectURL(file));  // Create a new preview URL
    };


    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const sendChatMessage = () => {
        if (socket) {
            const message = {user: 'You', message: inputValue, room_id: roomId}
            socket.emit('room_chat_msg', message);
            setInputValue('');
            setMessages(prevMessages => [...prevMessages, message]);
        }
    }
    const sendChatImage = async () => {
        if (socket && selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                const message = {user: 'You', image: base64data, room_id: roomId};
                socket.emit('room_chat_img', message);
                setMessages(prevMessages => [...prevMessages, message]);
                setSelectedImage(null);
                setPreviewURL(null);  // Clear the preview URL after sending the image
            };
            reader.readAsDataURL(selectedImage);
        }
    };
    useEffect(() => {
        if (showChatBox && unreadMessages.length > 0) {
            setMessages(prevMessages => [...prevMessages, ...unreadMessages]);
            dispatch({
                type: 'SET_UNREAD_MESSAGES', payload: [],
            });
        }
    }, [showChatBox, dispatch, unreadMessages]);

    const handleSend = () => {
        if (selectedImage) {
            sendChatImage();
        } else {
            sendChatMessage();
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('room_chat_msg', (message) => {
                console.log("message received: ", message);
                if (!showChatBox) {
                    dispatch({
                        type: 'SET_UNREAD_MESSAGES', payload: [...unreadMessages, message],
                    });
                } else {
                    setMessages(prevMessages => [...prevMessages, message]);
                }
            });
            socket.on('room_chat_img', (message) => {
                // handle image messages
                setMessages(prevMessages => [...prevMessages, message]);

            });
        }
        return () => {
            if (socket) {
                socket.off('room_chat_msg');
                socket.off('room_chat_img');  // Don't forget to clean up
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
        className={`flex flex-col h-[600px] lg:w-[599] lg:h-[756] p-4 bg-gray-50 border border-gray-300 rounded-md`}
    >
        <div className="overflow-auto mb-4 flex flex-col space-y-4 flex-grow">
            <div className="flex items-center font-bold text-lg mb-2">
                <FaComments className="mr-2 text-sky-500 "/>
                Chat
            </div>
            {messages.map((message, index) => (<div key={index}
                                                    className={`flex flex-col border-2 border-sky-500 gap-1 my-2  text-gray-800 p-2 rounded-md ${message.user === 'You' ? 'bg-sky-300 text-white ml-auto' : 'bg-white text-gray-500 mr-auto'}`}
                                                    style={{maxWidth: '70%'}}>
                <span className="text-sm font-bold text-sky-500">{message.user}</span>
                {message.message && <span className="text-slate-700 text-lg">{message.message}</span>}
                {message.image && <img src={message.image} alt="sent content"/>}
            </div>))}

            <div ref={endOfChatRef}></div>
        </div>
        <div className="flex mt-auto">
            <div className="flex items-center w-full rounded-l-md p-2 mr-1 bg-white">
                {previewURL && <img src={previewURL} alt="Preview"
                                    className="w-20 h-20 object-cover rounded-md mr-2"/>} {/* Thumbnail appears before the input field */}
                <input
                    className="flex-grow text-gray-900"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                />
            </div>
            <button
                onClick={() => fileInputRef.current.click()}
                className="bg-sky-500 hover:bg-sky-600 font-bold py-2 px-4 rounded-l-md cursor-pointer"
            >
                <FaFileImage className="text-white"/>
            </button>
            <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
            />
            <button
                onClick={handleSend} // call handleSend instead
                className="bg-sky-500 hover:bg-sky-600 font-bold py-2 px-4 rounded-r-md"
            >
                <FaPaperPlane className="text-white"/>
            </button>
        </div>
    </animated.div>);
};

export default ChatBox;

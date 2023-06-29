import React, {useState, useEffect, useRef, useContext} from 'react';
import {FaComments, FaPaperPlane, FaFileImage, FaFileAlt} from 'react-icons/fa';
import {SocketContext} from '../SocketContext';
import {useParams} from 'react-router-dom';
import {useTransition, animated} from 'react-spring';

const ChatBox = ({showChatBox, dispatch, unreadMessages}) => {
    const {state} = useContext(SocketContext);
    const {socket} = state;
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [previewURL, setPreviewURL] = useState(null);
    const endOfChatRef = useRef(null);
    const {roomId} = useParams();
    const imgInputRef = useRef();
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
        }, config: {mass: 1, tension: 280, friction: 20, precision: 0.00001},
    });

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setPreviewURL(URL.createObjectURL(file));
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const maxFileSize = 1024 * 1024 * 50;
        if (file.size > maxFileSize) {
            alert('File size is too large. Please select a file that is less than 50MB.');
            return;
        }
        setSelectedFile(file);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSend = () => {
        if (selectedImage) {
            sendChatImage();
        } else if (selectedFile) {
            sendChatFile();
        } else {
            sendChatMessage();
        }
    }

    const sendChatMessage = () => {
        if (socket) {
            const message = {user: 'You', message: inputValue, room_id: roomId}
            socket.emit('room_chat_msg', message);
            setInputValue('');
            setMessages(prevMessages => [...prevMessages, message]);
        }
    }

    const sendChatImage = () => {
        if (socket && selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                const message = {user: 'You', image: base64data, room_id: roomId};
                socket.emit('room_chat_img', message);
                setMessages(prevMessages => [...prevMessages, message]);
                setSelectedImage(null);
                setPreviewURL(null);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const sendChatFile = () => {
        if (socket && selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const blobData = reader.result;
                const message = {
                    user: 'You',
                    file: blobData,
                    filename: selectedFile.name,
                    filetype: selectedFile.type,
                    room_id: roomId
                };
                console.log(message);
                socket.emit('room_chat_file', message);
                setMessages(prevMessages => [...prevMessages, message]);
                setSelectedFile(null);
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

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
            {messages.map((message, index) => (<div key={index}
                                                    className={`flex flex-col border-2 border-sky-500 gap-1 my-2  text-gray-800 p-2 rounded-md ${message.user === 'You' ? 'bg-sky-300 text-white ml-auto' : 'bg-white text-gray-500 mr-auto'}`}
                                                    style={{maxWidth: '70%'}}>
                <span className="text-sm font-bold text-sky-500">{message.user}</span>
                {message.message && <span className="text-slate-700 text-lg">{message.message}</span>}
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


            <div ref={endOfChatRef}></div>
        </div>
        <div className="flex mt-auto">
            <div className="flex items-center w-full rounded-l-md bg-white">
                {previewURL && <img src={previewURL} alt="Preview"
                                    className="w-20 h-20 object-cover rounded-md mr-2"/>} {/* Thumbnail appears before the input field */}
                {selectedFile && (
                    <span className="text-sky-500 w-28 text-sm truncate overflow-hidden whitespace-wrap break-all">
                        {selectedFile.name}
                    </span>)}
                {!selectedFile && !selectedImage && (
                    <input
                        className="flex-grow text-gray-900"
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                )}
            </div>
            {!selectedFile && !selectedImage&& (<button
                onClick={() => imgInputRef.current.click()}
                className="bg-sky-500 hover:bg-sky-600 font-bold m-2 lg:m-1 lg:p-4 lg:rounded-full cursor-pointer "
            >
                <FaFileImage className="text-white text-2xl lg:text-sm"/>
            </button>)}
            <input
                ref={imgInputRef}
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
            />
            {!selectedFile && !selectedImage && (<button
                onClick={() => fileInputRef.current.click()} // Link the file input to this button
                className="bg-sky-500 hover:bg-sky-600 font-bold m-2 lg:m-1 lg:p-4 lg:rounded-full cursor-pointer "
            >
                <FaFileAlt className="text-white text-2xl lg:text-sm"/>
            </button>)}
            <input
                ref={fileInputRef} // This ref was previously unused
                id="file-upload"
                type="file"
                onChange={handleFileSelect} // Handle file selection with handleFileSelect
                className="hidden"
            />
            <button
                onClick={handleSend} // call handleSend instead
                className="bg-sky-500 hover:bg-sky-600 font-bold p-3 mx-2 rounded-r-xl cursor-pointer"
            >
                <FaPaperPlane className="text-white"/>
            </button>
        </div>
    </animated.div>);
};

export default ChatBox;

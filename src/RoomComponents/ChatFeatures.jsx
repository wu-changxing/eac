import React, {useState, useRef} from 'react';
import {FaFileAlt, FaFileImage, FaPaperPlane, FaPlus} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";

const ChatFeatures = ({messages, setMessages, socket}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const [previewURL, setPreviewURL] = useState(null);
    const {roomId} = useParams();
    const imgInputRef = useRef();
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showSendButtons, setShowSendButtons] = useState(false);


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
    const handleSend = () => {
        if (selectedImage) {
            sendChatImage();
        } else if (selectedFile) {
            sendChatFile();
        } else {
            sendChatMessage();
        }
        setShowSendButtons(false)
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }
    const toggleSendButtons = () => {
        setShowSendButtons((prevShowSendButtons) => !prevShowSendButtons);
    };
    return (<div className="flex mt-auto">
        <div className="flex items-center rounded-l-md bg-white">
            {previewURL && <img src={previewURL} alt="Preview"
                                className="w-20 h-20 object-cover rounded-md mr-2"/>} {/* Thumbnail appears before the input field */}
            {selectedFile && (
                <span className="text-sky-500 w-28 text-sm truncate overflow-hidden whitespace-wrap break-all">
                        {selectedFile.name}
                    </span>)}
            {!showSendButtons && (<input
                className="flex-grow text-gray-900"
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
            />)}
        </div>
        {showSendButtons && (<div className="flex flex-row flex-grow">
            {!selectedFile && !selectedImage && (<button
                onClick={() => imgInputRef.current.click()}
                className="bg-sky-500 hover:bg-sky-600 font-bold m-2 lg:m-1 lg:p-4 lg:rounded-full cursor-pointer"
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
                onClick={() => fileInputRef.current.click()}
                className="bg-sky-500 hover:bg-sky-600 font-bold m-2 lg:m-1 lg:p-4 lg:rounded-full cursor-pointer"
            >
                <FaFileAlt className="text-white text-2xl lg:text-sm"/>
            </button>)}
            <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>)}

        {showSendButtons ? (<button
            onClick={toggleSendButtons} // Toggle the display of send buttons
            className="bg-sky-500 hover:bg-sky-600 font-bold p-3 mx-2 rounded-full cursor-pointer"
        >
            <AiOutlineClose className="text-white"/>
        </button>) : (<button onClick={toggleSendButtons}
                              className="bg-sky-500 hover:bg-sky-600 font-bold p-3 mx-2 rounded-full cursor-pointer">

                <FaPlus className="text-white"/>
            </button>)

        }
        <button
            onClick={handleSend} // call handleSend instead
            className="bg-sky-500 hover:bg-sky-600 font-bold p-3 mx-2 rounded-r-xl cursor-pointer"
        >

            <FaPaperPlane className="text-white"/>
        </button>
    </div>);
};

export default ChatFeatures;

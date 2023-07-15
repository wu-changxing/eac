import React, {useState, useContext} from 'react';
import {GiArtificialIntelligence, GiBrain, GiFallingStar} from 'react-icons/gi';
import {GiGears, Gi3DGlasses, GiAutoRepair, GiWalkingBoot} from 'react-icons/gi';
import {SiRocketdotchat, SiNewjapanprowrestling, SiGooglenews} from 'react-icons/si';
import {FaRssSquare, FaComments, FaUsers, FaRegAngry, FaTeamspeak, FaInfoCircle} from 'react-icons/fa';
import {FaRobot, FaSatelliteDish, FaRegComments, FaUserFriends, FaListUl, FaListOl} from 'react-icons/fa'; // Updated icons
import AIChatToggle from './AIChatToggle';
import FeedList from './Feeds/FeedList';
import ChatBox from './ChatBoxComponents/ChatBox';
import UnreadMessages from './UnreadMessages';
import RoomPanel from './RoomInfo/RoomPanel';
import BookList from './Feeds/BookList';
import {SocketContext} from '../SocketContext';
import {BiLibrary} from 'react-icons/bi'; // Added BiLibrary icon

const RoomToolsBar = ({users, isAdmin, localStream, openVideo, setOpenVideo}) => {
    const {state, dispatch} = useContext(SocketContext);
    const {unreadMessages} = state;

    const [showIframe, setShowIframe] = useState(false);
    const [showFeedList, setShowFeedList] = useState(false);
    const [showChatBox, setShowChatBox] = useState(false);
    const [showRoomPanel, setShowRoomPanel] = useState(false);
    const [showBookList, setShowBookList] = useState(false); // Added showBookList state

    const handleIframeToggle = () => {
        setShowIframe(prevState => !prevState);
        if (showFeedList) {
            setShowFeedList(false);
        }
        if (showChatBox) {
            setShowChatBox(false);
        }
        if (showRoomPanel) {
            setShowRoomPanel(false);
        }
        if (showBookList) {
            setShowBookList(false);
        }
    };

    const handleFeedListToggle = () => {
        setShowFeedList(prevState => !prevState);
        if (showIframe) {
            setShowIframe(false);
        }
        if (showChatBox) {
            setShowChatBox(false);
        }
        if (showRoomPanel) {
            setShowRoomPanel(false);
        }
        if (showBookList) {
            setShowBookList(false);
        }
    };

    const handleChatBoxToggle = () => {
        setShowChatBox(prevState => !prevState);
        if (showIframe) {
            setShowIframe(false);
        }
        if (showFeedList) {
            setShowFeedList(false);
        }
        if (showRoomPanel) {
            setShowRoomPanel(false);
        }
        if (showBookList) {
            setShowBookList(false);
        }
    };

    const handleRoomPanelToggle = () => {
        setShowRoomPanel(prevState => !prevState);
        if (showIframe) {
            setShowIframe(false);
        }
        if (showFeedList) {
            setShowFeedList(false);
        }
        if (showChatBox) {
            setShowChatBox(false);
        }
        if (showBookList) {
            setShowBookList(false);
        }
    };

    const handleBookListToggle = () => {
        setShowBookList(prevState => !prevState);
        if (showIframe) {
            setShowIframe(false);
        }
        if (showFeedList) {
            setShowFeedList(false);
        }
        if (showChatBox) {
            setShowChatBox(false);
        }
        if (showRoomPanel) {
            setShowRoomPanel(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center px-5 py-5 lg:px-5 lg:py-5 lg:justify-end"
             style={{perspective: '1000px'}}>
            <div
                className="flex flex-row lg:flex-col space-x-2 justify-center lg:space-x-0 lg:space-y-2 border-b border-gray-200">
                <button
                    onClick={handleIframeToggle}
                    className={`flex items-center justify-center text-white rounded-t p-4 shadow-lg transition-all transform ease-in-out duration-500 
            ${showIframe ? 'bg-gray-400 hover:bg-gray-500' : 'bg-sky-500 hover:bg-sky-600'}`}
                >
                    {showIframe ? <GiArtificialIntelligence className="mr-2 lg:text-5xl"/> :
                        <GiBrain className="mr-2 lg:text-5xl"/>}
                    <span
                        className="lg:text-lg hidden lg:inline">{showIframe ? '' : (showFeedList || showChatBox || showRoomPanel || showBookList) ? '' : 'GPT Helper'}</span>
                </button>
                <button
                    onClick={handleFeedListToggle}
                    className={`flex items-center justify-center text-white rounded-t p-4 shadow-lg transition-all transform ease-in-out duration-500 
            ${showFeedList ? 'bg-gray-400 hover:bg-gray-500' : 'bg-sky-500 hover:bg-sky-600'}`}
                >
                    {showFeedList ? <Gi3DGlasses className="mr-2 lg:text-5xl"/> :
                        <SiGooglenews className="mr-2 lg:text-5xl"/>}
                    <span
                        className="lg:text-lg hidden lg:inline">{showFeedList ? '' : (showIframe || showChatBox || showRoomPanel || showBookList) ? '' : 'Show Feeds'}</span>
                </button>
                <button
                    onClick={handleBookListToggle}
                    className={`flex items-center justify-center text-white rounded-t p-4 shadow-lg transition-all transform ease-in-out duration-500 
            ${showBookList ? 'bg-gray-400 hover:bg-gray-500' : 'bg-sky-500 hover:bg-sky-600'}`}
                >
                    {showBookList ? <GiFallingStar className="mr-2 lg:text-5xl"/> :
                        <BiLibrary className="mr-2 lg:text-5xl"/>}
                    <span
                        className="lg:text-lg hidden lg:inline">{showBookList ? '' : (showIframe || showFeedList || showChatBox || showRoomPanel) ? '' : 'Book List'}</span>
                </button>
                <button
                    onClick={handleChatBoxToggle}
                    className={`flex items-center justify-center text-white rounded-t p-4 shadow-lg transition-all transform ease-in-out duration-500 
            ${showChatBox ? 'bg-gray-400 hover:bg-gray-500' : 'bg-sky-500 hover:bg-sky-600'}`}
                >
                    {showChatBox ? <FaTeamspeak className="mr-2 lg:text-5xl"/> :
                        <SiRocketdotchat className="mr-2 lg:text-5xl"/>}
                    <span
                        className="lg:text-lg hidden lg:inline">{showChatBox ? '' : (showIframe || showFeedList || showRoomPanel || showBookList) ? '' : 'Show Chat'}</span>
                </button>
                <button
                    onClick={handleRoomPanelToggle}
                    className={`flex items-center justify-center text-white rounded-t p-4 shadow-lg transition-all transform ease-in-out duration-500 
            ${showRoomPanel ? 'bg-gray-400 hover:bg-gray-500' : 'bg-sky-500 hover:bg-sky-600'}`}
                >
                    {showRoomPanel ? <GiAutoRepair className="mr-2 lg:text-5xl"/> :
                        <GiGears className="mr-2 lg:text-5xl"/>}
                    <span
                        className="lg:text-lg hidden lg:inline">{showRoomPanel ? '' : (showIframe || showFeedList || showChatBox || showBookList) ? '' : 'Room Panel'}</span>
                </button>

            </div>
            {showIframe && <AIChatToggle showIframe={showIframe}/>}
            {showFeedList && <FeedList/>}
             <ChatBox showChatBox={showChatBox} dispatch={dispatch} unreadMessages={unreadMessages} users={users}/>
            {showRoomPanel && <RoomPanel users={users} isAdmin={isAdmin} localStream={localStream} openVideo={openVideo}
                                         setOpenVideo={setOpenVideo}/>}
            {showBookList && <BookList/>}
            {!showChatBox && <UnreadMessages/>}
        </div>
    );
};

export default RoomToolsBar;

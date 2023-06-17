// AIChatToggle.js
import React from 'react';
import { GiArtificialIntelligence, GiBrain } from 'react-icons/gi'; // Add or change the second icon to the one you prefer

const AIChatToggle = ({ showIframe, setShowIframe }) => {
    return (
        <>
            {showIframe && (
                <div className="ml-auto lg:ml-4 mt-20 lg:mt-1 md:mt-0 w-[596px] h-[1000px] lg:h-[812px]">
                    <iframe src="https://gpt.aaron404.com" title="EAC GPT next" className="w-full h-full border-none"/>
                </div>
            )}
            <div className="flex justify-center px-10 py-10 lg:px-5 lg:py-5">
                <button
                    onClick={() => setShowIframe(!showIframe)}
                    className={`flex items-center justify-center text-white rounded-full lg:flex-col p-4 shadow-lg transition-all transform ease-in-out duration-500 
                                ${showIframe ? 'bg-gray-400 hover:bg-gray-500  hover:scale-105' : 'bg-sky-500 hover:bg-sky-600 hover:scale-105'}`}>
                    {showIframe ? <GiBrain className="mr-2 lg:text-5xl"/> : <GiArtificialIntelligence className="mr-2 lg:text-5xl"/>}
                    <span className="text-3xl lg:text-lg">{showIframe ? 'Hide GPT' : 'Show GPT Helper'}</span>
                </button>
            </div>
        </>
    );
};

export default AIChatToggle;

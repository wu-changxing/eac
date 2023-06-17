// AIChatToggle.js
import React from 'react';
import { GiArtificialIntelligence, GiBrain } from 'react-icons/gi'; // Add or change the second icon to the one you prefer

const AIChatToggle = ({ showIframe, setShowIframe }) => {
    return (
        <>
            {showIframe && (
                <div className="lg:flex-1 ml-auto lg:ml-4 mt-20 lg:mt-1 md:mt-0 w-[596px] h-[1000px] lg:h-[812px]">
                    <iframe src="https://gpt.aaron404.com" title="EAC GPT next" className="w-full h-full border-none"/>
                </div>
            )}

        </>
    );
};

export default AIChatToggle;

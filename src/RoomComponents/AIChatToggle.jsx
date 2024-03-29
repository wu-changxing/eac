// AIChatToggle.js
import React from 'react';
import { GiArtificialIntelligence, GiBrain } from 'react-icons/gi';
import { useTransition, animated } from "react-spring";

const AIChatToggle = ({ showIframe, setShowIframe }) => {
    const transitions = useTransition(showIframe, {
        from: { opacity: 0, transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' },
        enter: { opacity: 1, transform: 'perspective(600px) translate3d(0%,0,0) rotateY(0deg) scale(1)', boxShadow: '0px 30px 50px rgba(0, 0, 0, 0.4)', config: { friction: 18 } },
        leave: { opacity: 0, transform: 'perspective(600px) translate3d(100%,0,-4000px) rotateY(180deg) scale(0.1)', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', config: { duration: 5  }},
        config: { mass: 1, tension: 280, friction: 20, precision: 0.00001 },
    });

    return (
        transitions((styles, item) => item &&
            <animated.div
                style={styles}
                className="lg:flex-1 mt-5 lg:mt-1 w-full h-[650px] lg:h-[900]"
            >
                <iframe src="https://gpt.aaron404.com" title="EAC GPT next" className="order-none w-full h-full"/>
            </animated.div>
        )
    );
};

export default AIChatToggle;

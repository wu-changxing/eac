import React, { useEffect, useState } from 'react';  // Import useEffect and useState
import { useSpring, animated } from 'react-spring';
import { AiOutlineReload } from 'react-icons/ai';  // import the icon
import Macaw from '../../assets/macaw-logo-circle3.svg';
import Macaw1 from '../../assets/macaw-logo-cloud-2.svg';
import Macaw2 from '../../assets/macaw-logo-circle.svg';

function Loading() {
    const bounce = useSpring({
        to: [
            { transform: 'translate3d(0,-10px,0)' },
            { transform: 'translate3d(0,0,0)' },
        ],
        from: { transform: 'translate3d(0,0,0)' },
        loop: true,
        config: { tension: 200, friction: 5 },
    });

    const bounce1 = useSpring({
        to: [
            { transform: 'translate3d(0,-10px,0)', delay: 100 },
            { transform: 'translate3d(0,0,0)', delay: 100 },
        ],
        from: { transform: 'translate3d(0,0,0)' },
        loop: true,
        config: { tension: 200, friction: 5 },
    });

    const bounce2 = useSpring({
        to: [
            { transform: 'translate3d(0,-10px,0)', delay: 200 },
            { transform: 'translate3d(0,0,0)', delay: 200 },
        ],
        from: { transform: 'translate3d(0,0,0)' },
        loop: true,
        config: { tension: 200, friction: 5 },
    });

    // Add function to refresh the page
    const refreshPage = () => {
        window.location.reload();
    };

    // Timer for auto-refresh
    const [timer, setTimer] = useState(15);

    useEffect(() => {
        // Update timer every second
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : 0);
        }, 1000);

        const timeout = setTimeout(refreshPage, 15000);

        // Clear countdown and timeout if the component is unmounted
        return () => {
            clearInterval(countdown);
            clearTimeout(timeout);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-8 text-lg text-gray-500">Refreshing in <span className="text-5xl text-slate-700">{timer} </span>s. </div>
            <div className="flex justify-center space-x-4">
                <animated.img src={Macaw} alt="Macaw Logo" style={bounce} className="w-24 h-24" />
                <animated.img src={Macaw1} alt="Macaw Logo" style={bounce1} className="w-24 h-24" />
                <animated.img src={Macaw2} alt="Macaw Logo" style={bounce2} className="w-24 h-24" />
            </div>
            <div className="my-4 text-lg text-gray-500">Loading... </div>
            <div className="my-4 text-lg text-gray-500">You can refresh manually! </div>
            <div className="my-4 text-lg text-gray-500 flex-wrap max-w-xs">Concentric circles display the status. </div>

            <button
                onClick={refreshPage}
                className="mt-4 flex items-center text-lg text-sky-500 hover:text-sky-700"
            >
                <AiOutlineReload className="mr-2" />
                Refresh
            </button>
        </div>
    );
}

export default Loading;

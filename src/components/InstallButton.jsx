import React, { useEffect, useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import {MdOutlineAddToHomeScreen} from "react-icons/md";

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            setDeferredPrompt(e);
        });
    }, []);

    const installPWA = () => {
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
        // Clear deferredPrompt after prompting.
        setDeferredPrompt(null);
    };

    return (
        <button
            onClick={installPWA}
            className="flex flex-row my-2 cursor-pointer items-center bg-white text-lg text-sky-500 hover:text-slate-700 rounded-xl p-2"
            disabled={!deferredPrompt} // disable the button if the app can't be installed
        >
            <MdOutlineAddToHomeScreen className="mr-2 text-3xl" />
            <span className="font-semibold hidden lg:block ">安装EAC APP</span>
        </button>

    );
};

export default InstallButton;

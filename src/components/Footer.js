import React from 'react';
import InstallButton from "./InstallButton";

const Footer = () => {
    return (
        <footer className="w-full h-12 bg-sky-500 flex items-center justify-center transition-all duration-300 hover:bg-sky-700 mb-1">
            <InstallButton/>
            <div className="text-white text-xl p-4 text-center">
                Echo Atrium Chat

            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="fixed top-0 w-full h-20 bg-gray-200">
            <div className="flex justify-between items-center h-full px-4">
                {/*<img src={logo} alt="Logo" className="h-12 w-12 mx-2" />*/}
                <nav className="text-lg">
                </nav>
            </div>
        </header>
    );
};

export default Header;

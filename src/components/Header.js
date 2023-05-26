import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="fixed top-0 w-full bg-gray-200 md:h-20">
            <div className="flex flex-col md:flex-row justify-between items-center h-full px-4 md:px-10 lg:px-20">
                {/*<img src={logo} alt="Logo" className="h-12 w-12 mx-2" />*/}
                <nav className="text-lg">
                    <ul className="flex flex-col md:flex-row items-center">
                        <li className="mx-2 my-2 md:my-0">
                            <Link to="/roomlists">Room List</Link>
                        </li>
                        <li className="mx-2 my-2 md:my-0">
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { FaHome, FaInfoCircle, FaBlog, FaEnvelope, FaSignOutAlt, FaUser } from 'react-icons/fa'; // Import icons

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);
    const navInputRef = React.useRef();
    const handleNavClick = () => {
        setIsNavOpen(!isNavOpen);
    }

    const handleSubmenuClick = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    }
    const closeNavbar = () => {
        setIsNavOpen(false);
        navInputRef.current.checked = false;
    }
    return (<nav className="text-white bg-sky-500">

        <input
            ref={navInputRef}
            className="nav__trigger-input"
            type="checkbox"
            id="trigger"
            aria-label="open the navigation"
            onClick={handleNavClick}
        />
        <label
            className="fixed top-0 right-0 z-10 flex items-center w-16 h-10 mt-4 mr-2 mt-2 text-pink-500 nav__trigger-finger"
            htmlFor="trigger">
            <span></span>
        </label>
        <ul className={`nav__list ${isNavOpen ? 'nav__list-open' : ''}`}>
            <li className="nav__item mt-8">
                <Link to="/roomlists" className="nav__link" onClick={closeNavbar}>
                    <FaHome /> <span className="nav__text">Home</span>
                </Link>
            </li>
            <li className="nav__item">
                <a href="https://aaron404.com/musings" className="nav__link">
                    <FaInfoCircle /> <span className="nav__text">About</span>
                </a>
                <input className="nav__submenu-trigger-input" type="checkbox" id="submenu-trigger"
                       onClick={handleSubmenuClick}/>
                <label className="nav__submenu-trigger-finger" htmlFor="submenu-trigger"></label>
                <ul className={`nav__list-child ${isSubmenuOpen ? 'nav__list-child-open' : ''}`}>
                    <li className="nav__item">
                        <a href="https://aaron404.com/site/" className="nav__link">
                            <span className="nav__text">About the site</span>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a href="#hoi" className="nav__link">
                            <span className="nav__text">About me</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li className="nav__item">
                <a href="#hoi" className="nav__link">
                    <FaBlog className="text-white" /> <span className="nav__text">Blog</span>
                </a>
            </li>
            <li className="nav__item">
                <a href="#hoi" className="nav__link">
                    <FaEnvelope /> <span className="nav__text">Contact</span>
                </a>
            </li>
            <li className="nav__item">
                <Link to={"/logout"} className={"nav__link"} onClick={closeNavbar}>
                    <FaSignOutAlt /> <span className="nav__text">Logout</span>
                </Link>
            </li>
            <li className="nav__item">
                <Link to={"/profile"} className={"nav__link"} onClick={closeNavbar}>
                    <FaUser /> <span className="nav__text">Profile</span>
                </Link>
            </li>
        </ul>
    </nav>);
};

export default Navbar;

import React from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);

    const handleNavClick = () => {
        setIsNavOpen(!isNavOpen);
    }

    const handleSubmenuClick = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    }

    return (
        <nav className="text-white bg-sky-500">
            <input className="nav__trigger-input" type="checkbox" id="trigger" aria-label="open the navigation"
                   onClick={handleNavClick}/>

            <label
                className="fixed top-0 right-0 z-10 flex items-center w-24 h-16 m-10 text-pink-500 nav__trigger-finger"
                htmlFor="trigger">
                <span></span>
            </label>
            <ul className={`nav__list ${isNavOpen ? 'nav__list-open' : ''}`}>
                <li className="nav__item">
                    <a href="#hoi" className="nav__link">
            <span className="nav__text">
              List
            </span>
                    </a>
                </li>
                <li className="nav__item">
                    <a href="#hoi" className="nav__link">
            <span className="nav__text">
              About
            </span>
                    </a>
                    <input className="nav__submenu-trigger-input" type="checkbox" id="submenu-trigger"
                           onClick={handleSubmenuClick}/>
                    <label className="nav__submenu-trigger-finger" htmlFor="submenu-trigger"></label>
                    <ul className={`nav__list-child ${isSubmenuOpen ? 'nav__list-child-open' : ''}`}>
                        <li className="nav__item">
                            <a href="#hoi" className="nav__link">
                <span className="nav__text">
                  About the site
                </span>
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#hoi" className="nav__link">
                <span className="nav__text">
                  About me
                </span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav__item">
                    <a href="#hoi" className="nav__link">
            <span className="nav__text">
              Blog
            </span>
                    </a>
                </li>
                <li className="nav__item">
                    <a href="#hoi" className="nav__link">
            <span className="nav__text">
              Contact
            </span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

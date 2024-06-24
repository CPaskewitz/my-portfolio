import React from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item"><a href="#about" className="navbar__link">About</a></li>
                <li className="navbar__item"><a href="#projects" className="navbar__link">Projects</a></li>
                <li className="navbar__item"><a href="#contact" className="navbar__link">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
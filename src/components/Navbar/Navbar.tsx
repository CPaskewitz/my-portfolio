import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.scss';

interface NavbarProps {
    activeSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prevState => !prevState);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <nav
            className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMenuOpen ? 'navbar--menu-open' : ''}`}
            aria-label="Main navigation"
        >
            <div className="navbar__container">
                <a href="/" className="navbar__logo" aria-label="Corey Paskewitz - Home">
                    <img
                        src="/cp-logo.svg"
                        alt="site-logo"
                        className="navbar__logo-image"
                        width="40"
                        height="40"
                    />
                    <span className="visually-hidden">Corey Paskewitz</span>
                </a>

                <button
                    className={`navbar__menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="navbar-menu"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <span className="navbar__menu-icon"></span>
                    <span className="visually-hidden">Menu</span>
                </button>

                <div
                    id="navbar-menu"
                    className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}
                >
                    <ul className="navbar__list" role="menubar">
                        {navLinks.map(link => (
                            <li
                                key={link.id}
                                className="navbar__item"
                                role="none"
                            >
                                <a
                                    href={`#${link.id}`}
                                    className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                                    onClick={closeMenu}
                                    role="menuitem"
                                    aria-current={activeSection === link.id ? 'page' : undefined}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default React.memo(Navbar);
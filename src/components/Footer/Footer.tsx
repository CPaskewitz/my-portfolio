import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <h1 className="footer__title">Socials</h1>
            <div className="footer__icons">
                <a href="https://github.com/CPaskewitz" target="_blank" rel="noopener noreferrer">
                    <img src="/githubicon.png" alt="GitHub" className="footer__icon" />
                </a>
                <a href="https://www.linkedin.com/in/corey-paskewitz" target="_blank" rel="noopener noreferrer">
                    <img src="/linkedinicon.png" alt="LinkedIn" className="footer__icon" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
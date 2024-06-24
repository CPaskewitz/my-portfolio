import React from 'react';
import './Hero.scss';

const Hero: React.FC = () => {
    return (
        <div className="hero">
            <h1 className="hero__title">Hello, I'm Corey.</h1>
            <p className="hero__subtitle">I'm a full stack web developer.</p>
            <a href="#projects" className="hero__button-link">
                <button className="hero__button">View my work</button>
            </a>
        </div>
    );
}

export default Hero;
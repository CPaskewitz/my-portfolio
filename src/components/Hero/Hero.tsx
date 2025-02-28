import React, { useEffect, useState, useRef } from 'react';
import Column from '../Column/Column';
import './Hero.scss';

interface HeroProps {
    projectsRef: React.RefObject<HTMLDivElement>;
}

const Hero: React.FC<HeroProps> = ({ projectsRef }) => {
    const [columns, setColumns] = useState<number[]>([]);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const texts = [
        { text: 'Corey Paskewitz', bgColor: '#20a7d8' },
        { text: 'Web Developer', bgColor: '#CD921E' },
        { text: 'Software Engineer', bgColor: '#c10528' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const currentText = texts[currentTextIndex].text;
    const currentBgColor = texts[currentTextIndex].bgColor;

    const options = {
        imgSrc1: '/bg.jpg',
        imgSrc2: '/bgi.jpg',
        columns: 16,
        margin: 3,
    };

    useEffect(() => {
        const colsArray = Array.from({ length: options.columns }, (_, i) => i);
        setColumns(colsArray);
    }, [options.columns]);

    const handleCenterClick = () => {
        if (projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="hero">
            <div className="hero__placeholder" ref={placeholderRef}>
                {columns.map((col) => (
                    <Column
                        key={col}
                        col={col}
                        cols={options.columns}
                        margin={options.margin}
                        imgSrc1={options.imgSrc1}
                        imgSrc2={options.imgSrc2}
                    />
                ))}
            </div>
            <div className="hero__content">
                <div id="message" className="hero__center" onClick={handleCenterClick}>
                    <div className="hero__outside"></div>
                </div>
                <div className="hero__text-container">
                    <h1 className="hero__greeting">
                        Hello I'm
                        <span className="hero__animation" style={{ backgroundColor: currentBgColor }}>
                            {currentText}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Hero;
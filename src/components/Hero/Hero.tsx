import React, { useEffect, useState, useRef, useCallback } from 'react';
import Column from '../Column/Column';
import './Hero.scss';

const Hero: React.FC = () => {
    const [columns, setColumns] = useState<number[]>([]);
    const [directionX, setDirectionX] = useState(0);
    const placeholderRef = useRef<HTMLDivElement>(null);

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

    const handleMouseMove = useCallback((event: MouseEvent) => {
        setDirectionX(event.movementX || 0);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

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
                        directionX={directionX}
                    />
                ))}
            </div>
            <div className="hero__content">
                <h1 className="hero__title">I'm Corey, a Software Engineer.</h1>
                <p className="hero__subtitle">I make full stack web applications!</p>
                <a href="#projects" className="hero__button-link">
                    <button className="hero__button">View My Work</button>
                </a>
            </div>
        </div>
    );
};

export default Hero;
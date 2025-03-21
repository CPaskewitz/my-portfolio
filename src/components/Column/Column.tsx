import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Blind from '../Blind/Blind';

interface ColumnProps {
    col: number;
    cols: number;
    margin: number;
    imgSrc1: string;
    imgSrc2: string;
}

const Column: React.FC<ColumnProps> = ({ col, cols, margin, imgSrc1, imgSrc2 }) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const [rotationY, setRotationY] = useState(0);
    const colW = (window.innerWidth / cols) - margin;
    const colL = (colW + margin) * col;
    const [isImg1, setIsImg1] = useState(true);

    useEffect(() => {
        if (columnRef.current) {
            gsap.set(columnRef.current, {
                transformStyle: 'preserve-3d',
                perspective: 100000,
                rotationY: 0
            });
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        const newRotationY = isImg1 ? rotationY + 180 : rotationY - 180;
        setRotationY(newRotationY);
        setIsImg1(!isImg1);

        if (columnRef.current) {
            gsap.to(columnRef.current, {
                duration: 1,
                rotationY: newRotationY,
                transformOrigin: `50% 50% ${-colW / 2}px`,
                ease: 'back.out',
                overwrite: true,
            });
        }
    }, [isImg1, rotationY, colW]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMouseEnter();
        }
    }, [handleMouseEnter]);

    return (
        <div
            className="hero__column"
            ref={columnRef}
            style={{
                width: `${colW}px`,
                left: `${colL}px`,
                height: '100vh'
            }}
            onMouseEnter={handleMouseEnter}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Column ${col + 1}: Click to flip`}
            aria-pressed={!isImg1}
        >
            {[0, 1].map((j) => (
                <Blind
                    key={j}
                    colL={colL}
                    colW={colW}
                    imgSrc1={imgSrc1}
                    imgSrc2={imgSrc2}
                    rotationY={j * 180}
                />
            ))}
        </div>
    );
};

export default React.memo(Column);
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import Blind from '../Blind/Blind';

interface ColumnProps {
    col: number;
    cols: number;
    margin: number;
    imgSrc1: string;
    imgSrc2: string;
    directionX: number;
}

const Column: React.FC<ColumnProps> = ({ col, cols, margin, imgSrc1, imgSrc2, directionX }) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const [rotationY, setRotationY] = useState(0);
    const colW = (window.innerWidth / cols) - margin;
    const colL = (colW + margin) * col;

    useEffect(() => {
        if (columnRef.current) {
            gsap.set(columnRef.current, { transformStyle: 'preserve-3d', perspective: 100000, rotationY: 0 });
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        const newRotationY = directionX > 0 ? rotationY + 90 : rotationY - 90;
        setRotationY(newRotationY);
        if (columnRef.current) {
            gsap.to(columnRef.current, {
                duration: 1,
                rotationY: newRotationY,
                transformOrigin: `50% 50% ${-colW / 2}px`,
                ease: 'back.out',
            });
        }
    }, [directionX, rotationY, colW]);

    return (
        <div
            className="hero__column"
            ref={columnRef}
            style={{ width: `${colW}px`, left: `${colL}px`, height: '100vh' }}
            onMouseEnter={handleMouseEnter}
        >
            {[0, 1, 2, 3].map((j) => (
                <Blind key={j} colL={colL} colW={colW} imgSrc1={imgSrc1} imgSrc2={imgSrc2} rotationY={j * 90} />
            ))}
        </div>
    );
};

export default Column;
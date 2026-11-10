import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BlindProps {
    colL: number;
    colW: number;
    imgSrc1: string;
    imgSrc2: string;
    rotationY: number;
}

const Blind: React.FC<BlindProps> = ({ colL, colW, imgSrc1, imgSrc2, rotationY }) => {
    const blindRef = useRef<HTMLDivElement>(null);
    const bgImg = rotationY % 360 === 0 ? imgSrc1 : imgSrc2;

    useEffect(() => {
        if (blindRef.current) {
            gsap.set(blindRef.current, {
                rotationY: `${rotationY}`,
                transformOrigin: `50% 50% ${-colW / 2}px`,
                transformStyle: 'preserve-3d',
            });
        }
    }, [rotationY, colW]);

    return (
        <div
            className="hero__blind"
            ref={blindRef}
            style={{
                width: `${colW}px`,
                height: '100vh',
                position: 'absolute'
            }}
            aria-hidden="true"
        >
            <div
                className="hero__blind-img"
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: `url(${bgImg})`,
                    left: `-${colL}px`
                }}
                role="presentation"
            />
        </div>
    );
};

export default React.memo(Blind);
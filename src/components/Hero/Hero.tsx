import React, { useState, useEffect, useCallback, useRef } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import './Hero.scss';

interface HeroProps {
    projectsRef: React.RefObject<HTMLDivElement>;
}

const Hero: React.FC<HeroProps> = ({ projectsRef }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [activeImage, setActiveImage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

    const texts = [
        { text: 'Corey Paskewitz', bgColor: '#20a7d8' },
        { text: 'Web Developer', bgColor: '#CD921E' },
        { text: 'Software Engineer', bgColor: '#c10528' },
    ];

    const images = [
        '/bg.jpg',
        '/bgi.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [texts.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            switchImage();
        }, 7000);

        return () => {
            clearInterval(interval);
            if (transitionTimerRef.current) {
                clearTimeout(transitionTimerRef.current);
            }
        };
    }, [activeImage]);

    const switchImage = useCallback(() => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        transitionTimerRef.current = setTimeout(() => {
            setActiveImage((prev) => (prev + 1) % images.length);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 1000);
        }, 300);
    }, [isTransitioning, images.length]);

    const currentText = texts[currentTextIndex].text;
    const currentBgColor = texts[currentTextIndex].bgColor;

    const handleCenterClick = useCallback(() => {
        if (projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [projectsRef]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCenterClick();
        }
    }, [handleCenterClick]);

    return (
        <section className="hero" aria-label="Introduction">
            <div className="hero__background">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`hero__background-image ${index === activeImage ? 'hero__background-image--active' : ''
                            } ${isTransitioning && index === activeImage ? 'hero__background-image--transitioning' : ''}`}
                        style={{ backgroundImage: `url(${image})` }}
                        aria-hidden="true"
                    />
                ))}
            </div>

            <div className="hero__content">
                <div
                    id="message"
                    className="hero__center"
                    onClick={handleCenterClick}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-label="View my work"
                >
                    <div className="hero__center-image">
                        <LazyImage
                            src="/myImage.png"
                            alt=""
                            className="hero__profile-image icon-image"
                        />
                    </div>
                    <div className="hero__outside" aria-hidden="true"></div>
                </div>

                <div className="hero__text-container">
                    <h1 className="hero__greeting">
                        Hello I'm
                        <span
                            className="hero__animation"
                            style={{ backgroundColor: currentBgColor }}
                            aria-live="polite"
                        >
                            {currentText}
                        </span>
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Hero);
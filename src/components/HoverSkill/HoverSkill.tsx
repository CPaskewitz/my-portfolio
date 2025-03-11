import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';
import LazyImage from '../LazyImage/LazyImage';
import './HoverSkill.scss';

interface HoverSkillProps {
    src: string;
    alt: string;
    bgColor: string;
}

const HoverSkill: React.FC<HoverSkillProps> = ({ src, alt, bgColor }) => {
    const skillRef = useRef<HTMLDivElement | null>(null);

    const onHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!skillRef.current) return;

        const box = skillRef.current.getBoundingClientRect();
        const x = box.left + box.width * 0.5;
        const y = box.top + box.height * 0.5;

        gsap.to(skillRef.current, {
            x: (e.clientX - x) * 0.4,
            y: (e.clientY - y) * 0.4,
            scale: 1.15,
            ease: 'power2.out',
            duration: 0.4,
        });
        skillRef.current.style.zIndex = '10';
    }, []);

    const onLeave = useCallback(() => {
        if (!skillRef.current) return;

        gsap.to(skillRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            ease: 'elastic.out(1.2, 0.4)',
            duration: 0.7,
        });
        skillRef.current.style.zIndex = '1';
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const element = skillRef.current;
            if (!element) return;

            gsap.to(element, {
                scale: 1.15,
                duration: 0.2,
                onComplete: () => {
                    gsap.to(element, {
                        scale: 1,
                        duration: 0.5,
                        ease: 'elastic.out(1.2, 0.4)'
                    });
                }
            });
        }
    }, []);

    return (
        <div
            ref={skillRef}
            className="hover-skill"
            style={{ backgroundColor: bgColor }}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Skill: ${alt}`}
        >
            <div className="hover-skill__image">
                <LazyImage
                    src={src}
                    alt=""
                    className="icon-image"
                    width={70}
                    height={70}
                />
            </div>
            <div className="hover-skill__text">{alt}</div>
        </div>
    );
};

export default React.memo(HoverSkill);
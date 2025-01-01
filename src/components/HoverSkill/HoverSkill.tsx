import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import './HoverSkill.scss';

interface HoverSkillProps {
    src: string;
    alt: string;
    bgColor: string;
}

const HoverSkill: React.FC<HoverSkillProps> = ({ src, alt, bgColor }) => {
    const skillRef = useRef<HTMLDivElement | null>(null);
    const [hover, setHover] = useState(false);

    const onHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const box = skillRef.current!.getBoundingClientRect();
        const x = box.left + box.width * 0.5;
        const y = box.top + box.height * 0.5;

        gsap.to(skillRef.current, {
            x: (e.clientX - x) * 0.4,
            y: (e.clientY - y) * 0.4,
            scale: 1.15,
            ease: 'power2.out',
            duration: 0.4,
        });
        skillRef.current!.style.zIndex = '10';
        setHover(true);
    };

    const onLeave = () => {
        gsap.to(skillRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            ease: 'elastic.out(1.2, 0.4)',
            duration: 0.7,
        });
        skillRef.current!.style.zIndex = '1';
        setHover(false);
    };

    return (
        <div
            ref={skillRef}
            className="about__skill"
            style={{ backgroundColor: bgColor }}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
        >
            <img src={src} alt={alt} className="about__skill-icon" />
            <div className="about__skill-text">{alt}</div>
        </div>
    );
};

export default HoverSkill;
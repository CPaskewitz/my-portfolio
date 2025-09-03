import React, { useState, useEffect, useCallback, useRef } from "react";
import LazyImage from "../LazyImage/LazyImage";
import "./Hero.scss";

interface HeroProps {
  projectsRef: React.RefObject<HTMLDivElement>;
}

const Hero: React.FC<HeroProps> = ({ projectsRef }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [backgrounds, setBackgrounds] = useState({
    current: "/bgi.webp",
    next: "/bg.webp",
  });
  const [rippleState, setRippleState] = useState({
    active: false,
    x: 0,
    y: 0,
    size: 0,
  });

  const heroRef = useRef<HTMLElement>(null);
  const requestRef = useRef<number | null>(null);

  const texts = [
    { text: "Corey Paskewitz", bgColor: "#20a7d8" },
    { text: "Web Developer", bgColor: "#CD921E" },
    { text: "Software Engineer", bgColor: "#c10528" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const getMaxRadius = useCallback(() => {
    if (!heroRef.current) return 1500;

    const rect = heroRef.current.getBoundingClientRect();
    const { width, height } = rect;

    return Math.ceil(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * 1.2);
  }, []);

  const handleBackgroundClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".hero__center")) {
        return;
      }

      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      setRippleState({
        active: true,
        x,
        y,
        size: 0,
      });

      const startTime = performance.now();
      const maxRadius = getMaxRadius();
      const duration = 400;

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 2);
        const newSize = maxRadius * easeOut;

        setRippleState((prev) => ({
          ...prev,
          size: newSize,
        }));

        if (progress < 1) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          setBackgrounds((prev) => ({
            current: prev.next,
            next: prev.current,
          }));

          setRippleState({
            active: false,
            x: 0,
            y: 0,
            size: 0,
          });
        }
      };

      requestRef.current = requestAnimationFrame(animate);
    },
    [getMaxRadius]
  );

  const handleCenterClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [projectsRef]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (projectsRef.current) {
          projectsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [projectsRef]
  );

  const currentText = texts[currentTextIndex].text;
  const currentBgColor = texts[currentTextIndex].bgColor;

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/CPaskewitz',
      icon: '/githubicon.png',
      label: 'Visit my GitHub profile'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/corey-paskewitz',
      icon: '/linkedinicon.png',
      label: 'Connect with me on LinkedIn'
    },
    {
      name: 'Resume',
      url: '/Corey_Paskewitz_Resume.pdf',
      icon: '/resumeicon.png',
      label: 'View my resume'
    }
  ];

  return (
    <section className="hero" aria-label="Introduction" ref={heroRef}>
      <div className="hero__background" onClick={handleBackgroundClick}>
        <div
          className="hero__background-image hero__background-image--current"
          style={{ backgroundImage: `url(${backgrounds.current})` }}
          aria-hidden="true"
        />

        <div
          className="hero__background-image hero__background-image--next"
          style={{
            backgroundImage: `url(${backgrounds.next})`,
            clipPath: rippleState.active
              ? `circle(${rippleState.size}px at ${rippleState.x}px ${rippleState.y}px)`
              : "circle(0px at 0px 0px)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="hero__social-links">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.name === 'Resume' ? '_blank' : '_blank'}
            rel="noopener noreferrer"
            className="hero__social-link"
            aria-label={link.label}
          >
            <LazyImage
              src={link.icon}
              alt=""
              className="hero__social-icon icon-image"
            />
          </a>
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
              src="/myImage.webp"
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

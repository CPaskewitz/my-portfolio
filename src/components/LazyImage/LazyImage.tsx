import React, { useState, useEffect, useRef } from 'react';
import './LazyImage.scss';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    srcSet?: string;
    sizes?: string;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    srcSet,
    sizes,
    onClick
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!('IntersectionObserver' in window)) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.01,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.disconnect();
            }
        };
    }, []);

    const handleError = () => {
        console.error(`Failed to load image: ${src}`);
    };

    return (
        <div
            className={`lazy-image-container ${className} ${isLoaded ? 'loaded' : ''}`}
            style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
            ref={imgRef}
        >
            {!isLoaded && <div className="lazy-image-placeholder" aria-hidden="true"></div>}

            {isInView && (
                <img
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}
                    alt={alt}
                    className="lazy-image"
                    onLoad={() => setIsLoaded(true)}
                    onError={handleError}
                    width={width}
                    height={height}
                    loading="lazy"
                    onClick={onClick}
                    style={onClick ? { cursor: 'pointer' } : undefined}
                />
            )}
        </div>
    );
};

export default React.memo(LazyImage);
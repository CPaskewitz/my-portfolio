import React, { useEffect, useState } from 'react';
import './GlossyBackground.scss';

interface GlossyBackgroundProps {
    mode?: 'shine' | 'shadow';
    speed?: 'slow' | 'medium' | 'fast';
    active?: boolean;
}

const GlossyBackground: React.FC<GlossyBackgroundProps> = ({
    mode = 'shine',
    speed = 'medium',
    active = true
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!active) return null;

    return (
        <div
            className={`glossy-background 
                       ${mounted ? 'glossy-background--mounted' : ''} 
                       glossy-background--${speed} 
                       glossy-background--${mode}`}
            aria-hidden="true"
        >
            <div className="glossy-background__effect"></div>
        </div>
    );
};

export default GlossyBackground;
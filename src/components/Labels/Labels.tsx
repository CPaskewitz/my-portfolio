import React, { useMemo } from 'react';
import './Labels.scss';
import LazyImage from '../LazyImage/LazyImage';

interface Label {
    image: string;
    name: string;
}

interface LabelsProps {
    labels: Label[];
    size?: 'small' | 'medium' | 'large';
}

const Labels: React.FC<LabelsProps> = ({ labels, size = 'medium' }) => {
    const labelClasses = useMemo(() => {
        return labels.map((_, index) => {
            const colorIndex = index % 3;
            return `label label--${size} label--color-${colorIndex + 1}`;
        });
    }, [labels, size]);

    return (
        <ul className="labels" role="list" aria-label="Technologies used">
            {labels.map((label, index) => (
                <li key={index} className={labelClasses[index]}>
                    <div className="label__icon">
                        <LazyImage
                            src={label.image}
                            alt=""
                            className="label__image icon-image"
                            width={size === 'small' ? 12 : size === 'medium' ? 24 : 32}
                            height={size === 'small' ? 12 : size === 'medium' ? 24 : 32}
                        />
                    </div>
                    <span className="label__name">{label.name}</span>
                </li>
            ))}
        </ul>
    );
};

export default React.memo(Labels);
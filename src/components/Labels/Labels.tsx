import React from 'react';
import './Labels.scss';

interface Label {
    image: string;
    name: string;
}

interface LabelsProps {
    labels: Label[];
}

const Labels: React.FC<LabelsProps> = ({ labels }) => {
    return (
        <div className="labels">
            {labels.map((label, index) => (
                <div key={index} className="label">
                    <img src={label.image} alt={label.name} className="label__image" />
                    <span className="label__name">{label.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Labels;
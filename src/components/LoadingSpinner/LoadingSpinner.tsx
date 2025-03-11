import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner" aria-label="Loading content" role="status">
            <div className="spinner"></div>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;
import React from 'react';
import './styles/StepIndicator.css';

const StepIndicator = ({ result, children }) => {
    return (
        <div className={`StepIndicator ${result ? ' StepIndicator__success' : ''}`}>
            <div className="StepIndicator_circle"/>
            <div className="StepIndicator_display">
                {children}
            </div>
        </div>
    )
};

export default StepIndicator;
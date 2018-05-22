import React from 'react';
import './styles/StepIndicator.css';
import T from "../T";

const StepIndicator = ({ display, count, stepNumber }) => {
    return (
        <div className='StepIndicator'>
            <span className="text-dark"><T>Step</T>: {stepNumber} / {count}.</span>
            {display ? <span> <T>{display}</T></span> : ''}
        </div>
    )
};

export default StepIndicator;
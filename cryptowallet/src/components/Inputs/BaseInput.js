import React from 'react';

const BaseInput = ({ value, label, onSet, testFunc, children, disabled, required, placeholder }) => {
    if (testFunc) {
        value = testFunc(value) ? value : ''
    }
    return (
        <div className="form-group">
            <label>{label}</label>
            <input className="form-control" value={value} onChange={(e) => {
                let inputValue = e.target.value;
                if (testFunc && inputValue) {
                    inputValue = testFunc(inputValue) ? inputValue : value;
                }
                onSet(inputValue)
            }} required={required} disabled={disabled} placeholder={placeholder || ''}/>
            {children}
        </div>
    )
};

export default BaseInput;
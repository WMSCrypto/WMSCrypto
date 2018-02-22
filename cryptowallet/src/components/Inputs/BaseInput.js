import React from 'react';
import { t } from '../../utils/translate';

const BaseInput = ({ value, label, onSet, testFunc, children, disabled, required, placeholder, invalid }) => {
    if (testFunc) {
        value = testFunc(value) ? value : ''
    }
    return (
        <div className="form-group">
            <label>
                {label}
                {!required ? <small className="text-muted"> ({t('optional')})</small> : ''}
            </label>
            <input type="text"
                   className={["form-control", invalid ? 'is-invalid' : ''].join(' ')}
                   value={value}
                   onChange={(e) => {
                        let inputValue = e.target.value;
                        if (testFunc && inputValue) {
                            inputValue = testFunc(inputValue) ? inputValue : value;
                        }
                        onSet(inputValue)
                   }}
                   required={required} disabled={disabled} placeholder={placeholder || ''}/>
            {children}
        </div>
    )
};

export default BaseInput;
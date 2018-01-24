import React from 'react';


const PasswordInput = (props) => {
    const { value, placeholder, label, onChange, messages, id, invalid, valid } = props;
    const classNames = ["form-control", valid && 'is-valid', invalid && 'is-invalid'].join(' ');
    return (
        <div>
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input className={classNames}
                       id={id}
                       type="password"
                       placeholder={placeholder || ''}
                       onChange={onChange}
                       value={value}/>
                { messages && messages.map(
                    (e, i) =>
                        <small key={`key-${id}-${i}`} className="form-text text-muted">{e}</small>
                )}
            </div>
        </div>
    )
};

export default PasswordInput;

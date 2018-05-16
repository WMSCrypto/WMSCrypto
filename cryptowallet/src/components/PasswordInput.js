import React from 'react';
import T from "./T";

const PasswordInput = (props) => {
    const {
        value, placeholder, label, onChange,
        messages, id, invalid, valid, validMessage, inputAttrs
    } = props;
    const attrs = inputAttrs ? inputAttrs : {};
    const classNames = ["form-control", invalid && 'is-invalid'].join(' ');
    return (
        <div>
            <div className="form-group">
                <label htmlFor={id}>
                    <T>{label}</T>.
                </label>
                <input className={classNames}
                       id={id}
                       type="password"
                       placeholder={placeholder || ''}
                       onChange={onChange}
                       value={value}
                       {...attrs}/>
                { messages && messages.map(
                    (e, i) =>
                        <small key={`key-${id}-${i}`} className="form-text text-danger"><T>{e}</T></small>
                )}
                {valid && validMessage ? <small className="text-primary"><T>{validMessage}</T></small> : null}
            </div>
        </div>
    )
};

export default PasswordInput;

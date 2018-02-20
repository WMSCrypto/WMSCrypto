import React from 'react';
import BaseInput from "./BaseInput";

const IntegerInput = (props) => {
    return (
        <BaseInput {...props}
                   placeholder="0"
                   onSet={(v) => props.onSet(v ? parseInt(v, 10) : '')}
                   testFunc = {(v) => /^\d+$/.test(v)}>
            {props.children}
        </BaseInput>
    )
};

export default IntegerInput;
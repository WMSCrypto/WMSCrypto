import React from 'react';
import IntegerInput from "./IntegerInput";

const SatoshiInput = (props) => {
    return (
        <IntegerInput {...props}>
            <small className="text-muted">
                {props.value ? (Math.pow(10, -8) * props.value).toFixed(8) : 0.00} BTC
            </small>
            {props.children}
        </IntegerInput>
    )
};

export default SatoshiInput;
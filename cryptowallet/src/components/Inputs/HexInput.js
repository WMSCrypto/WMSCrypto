import React from 'react';
import BaseInput from "./BaseInput";

const HexInput = (props) => {
    let re = new RegExp("^[0-9a-fA-F]*$");
    if (props.maxLength) {
        re = new RegExp(`^[0-9a-fA-F]${props.maxLength}$`);
    }
    const { usePrefix } = props;
    return (
        <BaseInput {...props}
                   placeholder={usePrefix ? "0x0" : "0"}
                   testFunc = {(v) => {
                       if (!usePrefix) {
                           return re.test(v)
                       }

                       if (v.length === 1 && v[0] !== '0') {
                           return false
                       }

                       if (v.length === 2 && v.slice(0, 2) !== '0x') {
                           return false
                       }

                       return re.test(v.slice(2))
                   }}>
            {props.children}
        </BaseInput>
    )
};

export default HexInput;
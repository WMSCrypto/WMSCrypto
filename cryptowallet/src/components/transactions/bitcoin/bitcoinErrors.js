import React from 'react'
import T from "../../T";

const checkAllPresent = (data, required) => {
    if (data === null) {
        return null
    }
    const error = required.reduce((p, c) => (p || data[c] === undefined), false);
    if (error) {
        return <span><T>All fields must be present</T> ({required.join(', ')})</span>
    } else {
        return null
    }
};

export default (data) => {
    const errors = {ALL: [], valid: true};
    // Check inputs
    if (data.inputs) {
        const inputsIsList = Array.isArray(data.inputs);
        if (!inputsIsList) {
            errors.ALL.push('Inputs must be are list');
            errors.valid = false;
        }

        if (inputsIsList && data.inputs.length === 0) {
            errors.ALL.push('One input must be present');
            errors.valid = false
        }

        errors.inputs = data.inputs.map(i => {
            const err = checkAllPresent(i, ['prevout_n', 'prevout_hash', 'account', 'change', 'address', 'value']);
            if (err) { errors.valid = false }
            return err
        })

    } else {
        errors.ALL.push('Inputs must be present');
        errors.valid = false;
    }

    // Check receiver
    if (!data.receiver) {
        errors.ALL.push('Receiver must be present');
        errors.valid = false;
    } else {
        errors.receiver = checkAllPresent(data.receiver, ['value', 'address']);
        if (errors.receiver) { errors.valid = false }
    }

    // Check change
    if (data.change) {
        errors.change = checkAllPresent(data.change, ['value', 'address', 'account']);
        if (errors.change) { errors.valid = false }
    }
    return errors
}

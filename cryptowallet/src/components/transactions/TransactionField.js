import React from 'react';
import T from "../T";

const TransactionField = ({ valid, value, name }) => {
    if (value === undefined) {
        return null
    }
    return (
        <p  className={!valid ? 'text-danger' : ''}>
            <span className={!valid ? 'text-danger' : 'text-muted'}><T>{name}</T>: </span> {value}
        </p>
    )
};

export default TransactionField;
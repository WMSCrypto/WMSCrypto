import React from 'react'
import T from "../T";

const TransactionSection = ({ name, error, postfix }) => {
    if (error !== undefined) {
        return (
            <h5>
                <strong><T>{name}</T> {postfix !== undefined ? postfix : ''}</strong>
                {' '}
                {error ? <T className={error ? 'text-danger' : ''}>{error}</T> : null}
            </h5>
        )
    } else {
        return null
    }
};

export default TransactionSection
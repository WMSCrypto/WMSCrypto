import React from 'react';
import T from "../T";

const TransactionDeleteInputGroup = ({ onDelete }) => {
    return (
        <div className="TransactionDeleteInputGroup">
            <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
                <T>Delete</T>
            </button>
        </div>
    )
};

export default TransactionDeleteInputGroup
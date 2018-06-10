import React from 'react';
import T from "../T";

const TransactionDeleteInputGroup = (props) => {
    return (
        <div>
            <button className="btn btn-outline-danger btn-sm" onClick={props.onDelete}>
                <T>Delete</T>
            </button>
        </div>

    )
};

export default TransactionDeleteInputGroup
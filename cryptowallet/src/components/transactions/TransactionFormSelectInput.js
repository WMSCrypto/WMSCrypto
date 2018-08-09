import React from 'react';
import transactionFormWrapper from "../../core/transactionFieldWrapper";
import T from "../T";

const TransactionFormSelectInput = ({ label, value, onChange, items, prefix }) => {
    return (
        <div className="form-group">
            <div className="input-group">
                <label><T>{label}</T></label>
                <select className="Select" onChange={onChange}>
                    {items.map((v, i) =>
                        <option key={`${prefix}-${i}`}>{v}</option>)
                    }
                </select>
            </div>
        </div>
    )
};

export default transactionFormWrapper(TransactionFormSelectInput)
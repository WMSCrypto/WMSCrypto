import React from 'react';
import transactionFormWrapper from "../../core/transactionFieldWrapper";
import T from "../T";

const TransactionFormCheckboxInput = ({ label, value, onChange }) => {
    const e = {};
    e.target = {value: !value};
    return (
        <div className="form-check">
            <input type="checkbox"
                   className="form-check-input"
                   checked={value}
                   onChange={() => onChange(e)}/>
            <label><T>{label}</T></label>
        </div>
    )
};

export default transactionFormWrapper(TransactionFormCheckboxInput)
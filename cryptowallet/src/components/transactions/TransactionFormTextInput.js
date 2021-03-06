import React from 'react';
import { inputClasses } from "../../utils";
import transactionFormWrapper from "../../core/transactionFieldWrapper";
import T from "../T";
import TextInput from "../inputs/TextInput";

const TransactionFormTextInput = ({ label, valid, value, onChange }) => {
    return (
        <div className="form-group">
            <label><T>{label}</T></label>
            <TextInput className={inputClasses(valid)} value={value} onChange={onChange}/>
        </div>
    )
};

export default transactionFormWrapper(TransactionFormTextInput)
import React from 'react';
import T from "../../T";
import TransactionFormTextInput from "../TransactionFormTextInput";
import TransactionInputGroupHeader from "../TransactionInputGroupHeader";
import TransactionFormCheckboxInput from "../TransactionFormCheckboxInput";

const BitcoinOther = (props) => {
    return (
        <TransactionInputGroupHeader title={<T>Other</T>}>
            <div className="BitcoinChange">
                <TransactionFormTextInput field='locktime'/>
                <TransactionFormCheckboxInput field='useRBF'/>
            </div>
        </TransactionInputGroupHeader>
    )
};

export default BitcoinOther;
import React from 'react';
import T from "../../T";
import TransactionFormTextInput from "../TransactionFormTextInput";
import TransactionInputGroupHeader from "../TransactionInputGroupHeader";

const BitcoinOutput = (props) => {
    return (
        <TransactionInputGroupHeader title={<T>Output</T>}>
            <div className="BitcoinOutput">
                <TransactionFormTextInput field='receiver:address'/>
                <TransactionFormTextInput field='receiver:value'/>
            </div>
        </TransactionInputGroupHeader>
    )
};

export default BitcoinOutput;
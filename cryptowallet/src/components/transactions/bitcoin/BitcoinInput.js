import React from 'react';
import T from "../../T";
import TransactionFormTextInput from "../TransactionFormTextInput";

const BitcoinInput = (props) => {
    const flatBase = `#${props.n}:inputs`;
    return (
        <div className="BitcoinInput">
            <div>
                <h5><strong><T>Input</T> {props.n}</strong></h5>
            </div>
            <TransactionFormTextInput flatKey={`${flatBase}:prevout_n`}
                                      strict={true}/>
            <TransactionFormTextInput flatKey={`${flatBase}:prevout_hash`}
                                      strict={true}/>
            <TransactionFormTextInput flatKey={`${flatBase}:value`}
                                      strict={true}/>
        </div>
    )
};

export default BitcoinInput;
import React from 'react';
import T from "../../T";
import TransactionFormTextInput from "../TransactionFormTextInput";

const BitcoinInput = (props) => {
    const { n } = props;
    return (
        <div className="BitcoinInput">
            <div>
                <h5><strong><T>Input</T> {props.n}</strong></h5>
            </div>
            <TransactionFormTextInput field='inputs:prevout_n' index={n}/>
            <TransactionFormTextInput field='inputs:prevout_hash' index={n}/>
            <TransactionFormTextInput field='inputs:value' index={n}/>
        </div>
    )
};

export default BitcoinInput;
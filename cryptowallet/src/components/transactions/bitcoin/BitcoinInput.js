import React from 'react';
import T from "../../T";
import TransactionFormTextInput from "../TransactionFormTextInput";
import TransactionFormSelectInput from "../TransactionFormSelectInput";
import TransactionDeleteInputGroup from "../TransactionDeleteInputGroup";

const BitcoinInput = (props) => {
    const { n, viewN, onDelete } = props;
    return (
        <div className="BitcoinInput">
            <div className="TransactionInputGroupHeader">
                <h5><strong><T>Input</T> {viewN}</strong></h5>
                {n !== 0 ? <TransactionDeleteInputGroup onDelete={onDelete}/> : null}
            </div>
            <TransactionFormTextInput field='inputs:prevout_n' index={n}/>
            <TransactionFormTextInput field='inputs:prevout_hash' index={n}/>
            <div className="row">
                <div className="col-sm-4">
                    <TransactionFormTextInput field='inputs:account' index={n}/>
                </div>
                <div className="col-sm-4">
                    <TransactionFormSelectInput field='inputs:change'
                                                items={[0, 1]}
                                                prefix={`inputs-change-${n}`}
                                                index={n}/>
                </div>
                <div className="col-sm-4">
                    <TransactionFormTextInput field='inputs:address' index={n}/>
                </div>
            </div>
            <TransactionFormTextInput field='inputs:value' index={n}/>
        </div>
    )
};

export default BitcoinInput;
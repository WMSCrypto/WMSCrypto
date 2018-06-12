import React from 'react';
import T from "../../T";
import TransactionFormTextInput from "../TransactionFormTextInput";
import TransactionInputGroupHeader from "../TransactionInputGroupHeader";
import TransactionInputGroupDelete from "../TransactionInputGroupDelete";

const BitcoinChange = ({ onDelete }) => {
    return (
        <TransactionInputGroupHeader title={<T>Change</T>}>
            <div className="BitcoinChange">
                <TransactionInputGroupDelete onDelete={onDelete}/>
                <TransactionFormTextInput field='change:value'/>
                <div className="row">
                    <div className="col-sm-4">
                        <TransactionFormTextInput field='change:account'/>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <div className="input-group">
                                <label><T>Change</T></label>
                                <select className="Select" disabled={true}>
                                    <option>1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <TransactionFormTextInput field='change:address'/>
                    </div>
                </div>
            </div>
        </TransactionInputGroupHeader>
    )
};

export default BitcoinChange;
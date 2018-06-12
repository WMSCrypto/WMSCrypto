import React from 'react';
import T from "../../T";
import TransactionFormTextInput from "../TransactionFormTextInput";
import TransactionInputGroupHeader from "../TransactionInputGroupHeader";
import TransactionFormSelectInput from "../TransactionFormSelectInput";

const BitcoinOther = (props) => {
    return (
        <TransactionInputGroupHeader title={<T>Other</T>}>
            <div className="BitcoinChange">
                <TransactionFormTextInput field='locktime'/>
                <TransactionFormSelectInput field='useRBF'
                            items={['Yes', 'No']}
                            prefix='other'/>

            </div>
        </TransactionInputGroupHeader>
    )
};

export default BitcoinOther;
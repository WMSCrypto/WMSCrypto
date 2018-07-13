import React from 'react';
import TransactionField from "../TransactionField";
import fieldViews from "../../../core/fields/fieldsViews";
import { valueTransform } from "./bitcoinFields";

const getValue = (fieldsValues, flatKey, needTransform) => fieldsValues[flatKey] !== undefined
    ? (needTransform ? valueTransform(fieldsValues[flatKey]) : fieldsValues[flatKey])
    : 0;

export default ({ fieldsValues, data, manual }) => {

    const getter = (fk) => getValue(fieldsValues, fk, manual);
    const changeValue = getter('change:value');
    const receiverValue = getter('receiver:value');
    const inputsKeys = Object.keys(fieldsValues).filter(i => i.slice(0, 12) === 'inputs:value');
    const amount = inputsKeys.reduce((p, i) => p + (getter(i) || 0), 0);
    const fee = amount - (receiverValue + changeValue);
    return (
        <React.Fragment>
            {!data.exchange_info
                ? <TransactionField valid={true}
                                    name="Receiver"
                                    value={fieldsValues['receiver:address'] || '???'}/>
                : null
            }
            <TransactionField valid={receiverValue >= 0}
                              name="Value"
                              value={`${fieldViews.valueView(receiverValue)} BTC`}/>
            <TransactionField valid={fee >= 0}
                              name="Fee"
                              value={`${fieldViews.valueView(fee)} BTC`}/>
        </React.Fragment>
    )
}
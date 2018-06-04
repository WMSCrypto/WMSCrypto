import React from 'react';
import TransactionField from "../TransactionField";
import fieldViews from "../../../core/fieldViews";

export default ({ rawData }) => {
    const { inputs, receiver, change } = rawData;
    const changeValue = change && change.value !== undefined ? change.value : 0;
    const receiverValue = receiver && receiver.value !== undefined ? receiver.value : 0;
    const amount = inputs ? inputs.reduce((p, i) => p + (i.value || 0), 0) : 0;
    const fee = amount - (receiverValue + changeValue);
    return (
        <React.Fragment>
            <TransactionField valid={true}
                              name="Receiver"
                              value={receiver ? receiver.address : '???'}/>
            <TransactionField valid={true}
                              name="Value"
                              value={`${fieldViews.valueView(receiverValue)} BTC`}/>
            <TransactionField valid={true}
                              name="Fee"
                              value={`${fieldViews.valueView(fee)} BTC`}/>
        </React.Fragment>
    )
}
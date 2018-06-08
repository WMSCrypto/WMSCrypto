import React from 'react';
import TransactionField from "../TransactionField";
import fieldViews from "../../../core/fields/fieldsViews";

export default ({ data }) => {
    const { inputs, receiver, change } = data;
    const changeValue = (change && change.value !== undefined) ? change.value : 0;
    const receiverValue = (receiver && receiver.value !== undefined) ? receiver.value : 0;
    const amount = inputs ? inputs.reduce((p, i) => p + (i.value || 0), 0) : 0;
    const fee = amount - (receiverValue + changeValue);
    return (
        <React.Fragment>
            <TransactionField valid={true}
                              name="Receiver"
                              value={receiver ? receiver.address : '???'}/>
            {receiver && receiver.name
                ? <span style={{color: '#007bff'}}>
                    <TransactionField valid={true}
                                      name="Receiver name"
                                      value={<strong>{receiver.name}</strong>}/>
                  </span>

                : null
            }
            <TransactionField valid={true}
                              name="Value"
                              value={`${fieldViews.valueView(receiverValue)} BTC`}/>
            <TransactionField valid={true}
                              name="Fee"
                              value={`${fieldViews.valueView(fee)} BTC`}/>
        </React.Fragment>
    )
}
import React from 'react';
import TransactionField from "./TransactionField";
import fieldViews from '../../core/fields/fieldsViews';

export default ({ exchangeInfo }) => {
    if (!exchangeInfo) {
        return null
    } else {
        const { value, decimals, symbol } = exchangeInfo;
        return <span className="text-primary"><TransactionField valid={true}
                                 name="You receive"
                                 value={`${fieldViews.bigView(value, decimals).toString()} ${symbol}`}/></span>
    }
}
import React from 'react';
import TransactionField from "./TransactionField";

export default ({ exchangeInfo }) => {
    if (!exchangeInfo) {
        return null
    } else {
        const { value, decimal, symbol } = exchangeInfo;
        return <span className="text-primary"><TransactionField valid={true}
                                 name="You receive"
                                 value={`${Math.pow(10, decimal) * value} ${symbol}`}/></span>
    }
}
import React from 'react'
import BitcoinSummary from "./bitcoin/BitcoinSummary";

export default (props) => {
    const { coin, data, fieldsValues } = props.trx;
    switch (coin) {
        case 0:
            return <BitcoinSummary fieldsValues={fieldsValues} data={data}/>;
        default:
            return null
    }
};
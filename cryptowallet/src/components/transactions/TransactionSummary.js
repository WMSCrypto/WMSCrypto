import React from 'react'
import BitcoinSummary from "./bitcoin/BitcoinSummary";

export default ({ trx, manual }) => {
    const { coin, data, fieldsValues } = trx;
    switch (coin) {
        case 0:
            return <BitcoinSummary fieldsValues={fieldsValues} data={data} manual={manual}/>;
        default:
            return null
    }
};
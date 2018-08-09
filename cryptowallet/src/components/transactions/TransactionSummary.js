import React from 'react'
import BitcoinSummary from "./bitcoin/BitcoinSummary";
import EthereumSummary from "./ethereum/EthereumSummary";


export default ({ trx, manual }) => {
    const { coin, data, fieldsValues } = trx;
    switch (coin) {
        case 0:
            return <BitcoinSummary fieldsValues={fieldsValues} data={data} manual={manual}/>;
        case 60:
            return <EthereumSummary fieldsValues={fieldsValues} data={data} manual={manual}/>;
        default:
            return null
    }
};
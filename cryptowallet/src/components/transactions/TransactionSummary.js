import React from 'react'
import BitcoinSummary from "./bitcoin/BitcoinSummary";

export default (props) => {
    const { flatData, rawData, coin } = props.trx;
    const componentProps = { flatData, rawData };
    switch (coin) {
        case 0:
            return <BitcoinSummary {...componentProps}/>;
        default:
            return null
    }
};
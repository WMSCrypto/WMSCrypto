import React from 'react'
import BitcoinSummary from "./bitcoin/BitcoinSummary";

export default (props) => {
    const { data, coin } = props.trx;
    switch (coin) {
        case 0:
            return <BitcoinSummary data={data}/>;
        default:
            return null
    }
};
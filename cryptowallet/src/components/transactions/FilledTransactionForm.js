import React from 'react'
import BitcoinDetail from "./bitcoin/BitcoinDetail";


const FilledTransactionForm = (props) => {
    const { flatData, rawData, errors, coin } = props.trx;
    const componentProps = { flatData, rawData, errors };
    switch (coin) {
        case 0:
            return <BitcoinDetail {...componentProps}/>;
        default:
            return null
    }
};

export default FilledTransactionForm;
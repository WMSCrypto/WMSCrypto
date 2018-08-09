import React from 'react'
import BitcoinDetail from "./bitcoin/BitcoinDetail";
import EthereumDetail from "./ethereum/EthereumDetail";

const FilledTransactionForm = (props) => {
    const { data, fieldsValues, validation, errors, coin } = props.trx;
    const componentProps = { data, fieldsValues, validation, errors };
    switch (coin) {
        case 0:
            return <BitcoinDetail {...componentProps}/>;
        case 60:
            return <EthereumDetail {...componentProps}/>;
        default:
            return null
    }
};

export default FilledTransactionForm;
import React from 'react'
import BitcoinForm from './bitcoin/BitcoinForm';
import EthereumForm from "./ethereum/EthereumForm";

const ManualTransactionForm = (props) => {
    const { data, fill } = props.trx;
    const { coin, fillForm, deleteFormGroup } = props;
    const componentProps = { data, fillForm, deleteFormGroup, fill, coin };
    switch (coin) {
        case 0:
            return <BitcoinForm {...componentProps}/>;
        case 60:
            return <EthereumForm {...componentProps}/>;
        default:
            return null
    }
};

export default ManualTransactionForm;
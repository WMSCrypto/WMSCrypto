import React from 'react'
import BitcoinForm from './bitcoin/BitcoinForm';

const ManualTransactionForm = (props) => {
    const { data, fill } = props.trx;
    const { coin, fillForm } = props;
    const componentProps = { data, fillForm, fill, coin };
    switch (coin) {
        case 0:
            return <BitcoinForm {...componentProps}/>;
        default:
            return null
    }
};

export default ManualTransactionForm;
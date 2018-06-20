import React from 'react';
import TransactionField from "../TransactionField";
import fieldViews from "../../../core/fields/fieldsViews";
import ethereumFields from "./ethereumFields";
import { getField } from "../../../core/fields";
import { hexView } from "./ethereumSigner";

const ALL_FIELDS = Object.keys(ethereumFields);

const getAllFields = (fieldsValues, validation) => {
    const getter = (name) => getField({
        fields: ethereumFields, fieldsValues, validation, name
    });
    return ALL_FIELDS.reduce((p, c) => {p[c] = getter(c); return p}, {})

};

const intWithHexView = (v) => {
    return <span>{v} <span className="text-muted">({hexView(v)})</span></span>
};

const EthereumDetail = ({ data, fieldsValues, validation }) => {
    const fields = getAllFields(fieldsValues, validation);
    const {
        account,
        change,
        address,
        nonce,
        gasPrice,
        gasLimit,
        to,
        value,
    } = fields;
    const wallet = fieldViews.walletView({
        coin: 60, account: account.value, address: address.value, change: change.value
    });
    const walletValid = account.valid && address.valid && change.valid;
    return (
        <React.Fragment>
            <TransactionField value={wallet} valid={walletValid} name='Account'/>
            <TransactionField value={intWithHexView(nonce.value)} valid={nonce.valid} name='Nonce'/>
            <TransactionField value={intWithHexView(gasPrice.value)} valid={gasPrice.valid} name='Gas price'/>
            <TransactionField value={intWithHexView(gasLimit.value)} valid={gasLimit.valid} name='Gas limit'/>
            <TransactionField value={to.value} valid={to.valid} name='To'/>
            <TransactionField value={intWithHexView(value.value)} valid={value.valid} name='Value'/>
            { fields.data.value
                ? <TransactionField value={fields.data.value} valid={fields.data.valid} name='Data'/>
                : null
            }
        </React.Fragment>
    )
};

export default EthereumDetail;
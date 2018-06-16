import React from 'react';
import TransactionField from "../TransactionField";
import TransactionSection from "../TransactionSection";
import fieldViews from "../../../core/fields/fieldsViews";
import ethereumFields from "./ethereumFields";
import { getField } from "../../../core/fields";
import { hexView } from "../../../utils";

const ALL_FIELDS = Object.keys(ethereumFields);

// const BitcoinInput = ({ n, sectionError, getter }) => {
//     const [ prevout_n, prevout_hash, account, change, address, value ] = INPUT_FIELDS.map(k => getter(`inputs:${k}`, n));
//     const wallet = fieldViews.walletView({
//         coin: 0, account: account.value, address: address.value, change: change.value
//     });
//     const walletValid = account.valid && address.valid && change.valid;
//     return (
//         <React.Fragment>
//             <TransactionSection name='Input' postfix={n} error={sectionError}/>
//             <TransactionField value={prevout_n.value} valid={prevout_n.valid} name='Output ID'/>
//             <TransactionField value={prevout_hash.value} valid={prevout_hash.valid} name='Previous transaction hash'/>
//             <TransactionField value={wallet} valid={walletValid} name='Account'/>
//             <TransactionField value={value.view.field(value.value)} valid={value.valid} name='Value'/>
//         </React.Fragment>
//     )
// };

const BitcoinOutput = ({ getter, sectionError }) => {
    return (
        <React.Fragment>
            <TransactionSection name='Receiver' error={sectionError}/>
            {['Address', 'Value'].map(k => {
                const key = `receiver:${k.toLowerCase()}`;
                const data = getter(key);
                if (data.exists) {
                    return (
                        <TransactionField key={key}
                                          value={data.view.field(data.value)}
                                          valid={data.valid}
                                          name={k}/>
                    )
                } else {
                    return null
                }
            })}
        </React.Fragment>
    );
};

const BitcoinChange = ({ getter, sectionError }) => {
    const [ value, address, account ] = ['value', 'address', 'account'].map(
        i => getter(`change:${i}`)
    );
    const showWallet = account.exists || address.exists;
    const show = value.exists || showWallet;
    if (!show) {
        return null
    }
    return (
        <React.Fragment>
            <TransactionSection name='Change' error={sectionError}/>
            <TransactionField value={value.view.field(value.value)} valid={value.valid} name='Value'/>
            {showWallet
                ? <TransactionField value={fieldViews.walletView({ coin: 0, account: account.value, address: address.value, change: 1})}
                                    valid={account.valid && address.valid}
                                    name='Account for change'/>
                : null
            }
        </React.Fragment>
    );
};

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
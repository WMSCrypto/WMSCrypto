import React from 'react';
import TransactionField from "../TransactionField";
import TransactionSection from "../TransactionSection";
import fieldViews from "../../../core/fields/fieldsViews";
import bitcoinFields from "./bitcoinFields";
import { getField } from "../../../core/fields";

const INPUT_FIELDS = ['prevout_n', 'prevout_hash', 'account', 'change', 'address', 'value'];

const BitcoinInput = ({ n, sectionError, getter }) => {
    const [ prevout_n, prevout_hash, account, change, address, value ] = INPUT_FIELDS.map(k => getter(`inputs:${k}`, n));
    const wallet = fieldViews.walletView({
        coin: 0, account: account.value, address: address.value, change: change.value
    });
    const walletValid = account.valid && address.valid && change.valid;
    return (
        <React.Fragment>
            <TransactionSection name='Input' postfix={n} error={sectionError}/>
            <TransactionField value={prevout_n.value} valid={prevout_n.valid} name='Output ID'/>
            <TransactionField value={prevout_hash.value} valid={prevout_hash.valid} name='Previous transaction hash'/>
            <TransactionField value={wallet} valid={walletValid} name='Account'/>
            <TransactionField value={value.view.field(value.value)} valid={value.valid} name='Input value'/>
        </React.Fragment>
    )
};

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

const BitcoinDetail = ({ data, fieldsValues, validation, errors }) => {
    const getter = (name, index=null) => getField({
        fields: bitcoinFields, fieldsValues, validation, name, index
    });
    return (
        <React.Fragment>
            {data.inputs && data.inputs.map(
                (e, i) => <BitcoinInput {...e} n={i} getter={getter}  key={`#${i}-input`} sectionError={errors.inputs[i]}/>
            )}
            <BitcoinOutput getter={getter} sectionError={errors.receiver}/>
            <BitcoinChange getter={getter} sectionError={errors.change}/>
            <TransactionSection name='Other' error={false}/>
            <TransactionField value={fieldsValues['locktime']} valid={validation['locktime']} name='Locktime'/>
            <TransactionField value={bitcoinFields['useRBF'].view.field(fieldsValues['useRBF'])} valid={validation['useRBF']} name='Use RBF'/>
        </React.Fragment>
    )
};

export default BitcoinDetail;
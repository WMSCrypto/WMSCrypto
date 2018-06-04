import React from 'react';
import TransactionField from "../TransactionField";
import TransactionSection from "../TransactionSection";
import fieldViews from "../../../core/fieldViews";

const INPUT_FIELDS = ['prevout_n', 'prevout_hash', 'account', 'change', 'address', 'value'];

const BitcoinInput = ({ n, sectionError, flatData }) => {
    const [ prevout_n, prevout_hash, account, change, address, value ] = INPUT_FIELDS.map(k => flatData[`#${n}:inputs:${k}`] || {});
    return (
        <React.Fragment>
            <TransactionSection name='Input' postfix={n} error={sectionError}/>
            <TransactionField value={prevout_n.view} valid={prevout_n.valid} name='Output ID'/>
            <TransactionField value={prevout_hash.view} valid={prevout_hash.valid} name='Previous transaction hash'/>
            <TransactionField value={fieldViews.walletView({coin: 0, account: account.view, address: address.view, change: change.view })}
                              valid={account.valid && address.valid && change.valid}
                              name='Account'/>
            <TransactionField value={value.view} valid={value.valid} name='Value'/>
        </React.Fragment>
    )
};

const BitcoinOutput = ({ flatData, sectionError }) => {
    return (
        <React.Fragment>
            <TransactionSection name='Receiver' error={sectionError}/>
            {['Address', 'Value'].map(k => {
                const key = `receiver:${k.toLowerCase()}`;
                const data = flatData[key];
                if (data) {
                    return (
                        <TransactionField key={key}
                                          value={data.view}
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

const BitcoinChange = ({ flatData, sectionError }) => {
    const [ value, address, account ] = ['value', 'address', 'account'].map(
        i => flatData[`change:${i}`] || {}
    );
    return (
        <React.Fragment>
            <TransactionSection name='Change' error={sectionError}/>
            <TransactionField value={value.view} valid={value.valid} name='Value'/>
            {address.value !== undefined || account.value !== undefined
                ? <TransactionField value={fieldViews.walletView({ coin: 0, account: account.value, address: address.value, change: 1})}
                                    valid={address.valid && account.valid}
                                    name='Account for change'/>
                : null
            }
        </React.Fragment>
    );
};

const BitcoinDetail = ({ flatData, rawData, errors }) => {
    const locktime = flatData['locktime'] || {value: 0, valid: true};
    const useRBF = flatData['useRBF'] || {value: false, valid: true};
    const inputs = Array.isArray(rawData.inputs) ? rawData.inputs : [];
    return (
        <React.Fragment>
            {
                inputs.map((e, i) => <BitcoinInput {...e}
                                                   n={i}
                                                   flatData={flatData}
                                                   key={`#${i}-input`}
                                                   sectionError={errors.inputs[i]}/>
                )
            }
            <BitcoinOutput flatData={flatData} sectionError={errors.receiver}/>
            <BitcoinChange flatData={flatData} sectionError={errors.change}/>
            <TransactionSection name='Other' error={false}/>
            <TransactionField value={locktime.view} valid={locktime.valid} name='Locktime'/>
            <TransactionField value={useRBF.view} valid={useRBF.valid} name='Use RBF'/>
        </React.Fragment>
    )
};

export default BitcoinDetail;
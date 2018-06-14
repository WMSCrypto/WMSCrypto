import React from 'react';
import TransactionField from "../TransactionField";
import TransactionSection from "../TransactionSection";
import fieldViews from "../../../core/fields/fieldsViews";
import bitcoinFields from "./bitcoinFields";

const INPUT_FIELDS = ['prevout_n', 'prevout_hash', 'account', 'change', 'address', 'value'];

const BitcoinInput = ({ n, sectionError, fieldsValues, validation }) => {
    const [ prevout_n, prevout_hash, account, change, address, value ] = INPUT_FIELDS.map(k => `inputs:${k}:#${n}`);
    return (
        <React.Fragment>
            <TransactionSection name='Input' postfix={n} error={sectionError}/>
            <TransactionField value={fieldsValues[prevout_n]} valid={validation[prevout_n]} name='Output ID'/>
            <TransactionField value={fieldsValues[prevout_hash]} valid={validation[prevout_hash]} name='Previous transaction hash'/>
            <TransactionField value={fieldViews.walletView({
                                  coin: 0, account: fieldsValues[account], address: fieldsValues[address], change: fieldsValues[change]
                              })}
                              valid={validation[account] && validation[address] && validation[change]}
                              name='Account'/>
            <TransactionField value={bitcoinFields['inputs:value'].view.field(fieldsValues[value])}
                              valid={validation[value]} name='Value'/>
        </React.Fragment>
    )
};

const BitcoinOutput = ({ fieldsValues, validation, sectionError }) => {
    return (
        <React.Fragment>
            <TransactionSection name='Receiver' error={sectionError}/>
            {['Address', 'Value'].map(k => {
                const key = `receiver:${k.toLowerCase()}`;
                const data = fieldsValues[key];
                if (data) {
                    return (
                        <TransactionField key={key}
                                          value={bitcoinFields[key].view.field(data)}
                                          valid={validation[key]}
                                          name={k}/>
                    )
                } else {
                    return null
                }
            })}
        </React.Fragment>
    );
};

const BitcoinChange = ({ fieldsValues, validation, sectionError }) => {
    const [ value, address, account ] = ['value', 'address', 'account'].map(
        i => `change:${i}`
    );
    return (
        <React.Fragment>
            <TransactionSection name='Change' error={sectionError}/>
            <TransactionField value={bitcoinFields[value].view.field(fieldsValues[value])} valid={validation[value]} name='Value'/>
            {fieldsValues[account] !== undefined || fieldsValues[address] !== undefined
                ? <TransactionField value={fieldViews.walletView({ coin: 0, account: fieldsValues[account], address: fieldsValues[address], change: 1})}
                                    valid={validation[account] && validation[address]}
                                    name='Account for change'/>
                : null
            }
        </React.Fragment>
    );
};

const BitcoinDetail = ({ data, fieldsValues, validation, errors }) => {
    return (
        <React.Fragment>
            {null}
            {
                data.inputs && data.inputs.map((e, i) => <BitcoinInput {...e} n={i}
                                                        fieldsValues={fieldsValues}
                                                        validation={validation}
                                                        key={`#${i}-input`}
                                                        sectionError={errors.inputs[i]}/>
                )
            }
            <BitcoinOutput fieldsValues={fieldsValues}
                           validation={validation}
                           sectionError={errors.receiver}/>
            <BitcoinChange  fieldsValues={fieldsValues}
                           validation={validation}
                            sectionError={errors.change}/>
            <TransactionSection name='Other' error={false}/>
            <TransactionField value={fieldsValues['locktime']} valid={validation['locktime']} name='Locktime'/>
            <TransactionField value={bitcoinFields['useRBF'].view.field(fieldsValues['useRBF'])} valid={validation['useRBF']} name='Use RBF'/>
        </React.Fragment>
    )
};

export default BitcoinDetail;
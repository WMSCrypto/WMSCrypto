import React, { Component } from 'react';
import { hexView, getETXTxData } from "../../utils";
import { t } from '../../utils/translate';
import WalletAddressInput from "../Inputs/WalletAddressInput";

const intTest = (v) => v ? /^\d+$/.test(v) : true;
const addressTest = (v) => v ? /^0x[\da-fA-F]{40}$/.test(v) : false;
const hexTest = (v) => v ? /^0x[\da-fA-F]*$/.test(v) : true;
const valueTest = (v) => v ? /^\d+\.?\d{0,18}$/.test(v) : true;

const checkTransaction = (transaction) => {
    const invalidFields = ['nonce', 'gasPrice', 'gasLimit', 'to', 'value', 'value'].filter(
        (v) => transaction[v] === '' || transaction[v] === undefined
    );

    if (invalidFields.length) {
        return false
    }

    const invalidAddressFields = ['address', 'account'].filter(
        (v) => transaction[v] === ''
    );

    if (invalidAddressFields.length) {
        return false
    }

    return addressTest(transaction['to']) && hexTest(transaction['data'])
};

class EthereumTransactionFrom extends Component {

    getInputProps(name, validator) {
        const { block, onSet, transaction } = this.props;
        return {
            value: transaction[name],
            onChange: (e) => {
                let { value } = e.target;
                if (validator) {
                    value = validator(value) ? value : transaction[name];
                }
                const txCopy = {...transaction};
                txCopy[name] = value;
                onSet(name, value, checkTransaction(txCopy))
            },
            disabled: block
        };
    }

    render() {
        const {
            nonce=0,
            gasPrice=0,
            gasLimit=0,
            to='',
            value=0,
            data='',
            account=0,
            change=0,
            address=0,
        } = this.props.transaction;
        const validatedTo = addressTest(to);
        const validatedData = hexTest(data);
        const toErrorMessage = !validatedTo ? 'Address must start with 0x, be 0-9, a-f, A-F and len 40' : null;
        const dataErrorMessage = !validatedData ? 'Data must start with 0x, be 0-9, a-f, A-F' : null;
        return(
            <div>
                <p>Ethereum transaction form</p>
                <WalletAddressInput disabled={{all: this.props.block}}
                                    purpose={44}
                                    coin={60}
                                    account={account}
                                    change={change}
                                    address={address}
                                    onSet={(obj) => {
                                        const txCopy = {...this.props.transaction, ...obj};
                                        this.props.onSet(null, obj, checkTransaction(txCopy))
                                    }}/>
                <div className="form-group">
                    <label htmlFor="inputNonce">{t("Nonce")}</label>
                    <input type="text"
                           className="form-control"
                           id="inputNonce"
                           required={true}
                           {...this.getInputProps('nonce', intTest)}/>
                    <small className="form-text text-muted">{hexView(nonce)}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputGasPrice">{t("Gas price")}</label>
                    <input type="text"
                           className="form-control"
                           id="inputGasPrice"
                           required={true}
                           {...this.getInputProps('gasPrice', intTest)}/>
                    <small className="form-text text-muted">{hexView(gasPrice)}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputGasLimit">{t("Gas limit")}</label>
                    <input type="text"
                           className="form-control"
                           id="inputGasLimit"
                           required={true}
                           {...this.getInputProps('gasLimit', intTest)}/>
                    <small className="form-text text-muted">{hexView(gasLimit)}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputTo">{t("To")}</label>
                    <input type="text"
                           className="form-control"
                           id="inputTo"
                           required={true}
                           {...this.getInputProps('to')}/>
                    {validatedTo
                        ? null
                        : <small className="form-text text-danger">{toErrorMessage}</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="inputValue">{t("Value")}</label>
                    <input type="text"
                           className="form-control"
                           id="inputValue"
                           required={true}
                           {...this.getInputProps('value', valueTest)}/>
                    <small className="form-text text-muted">{hexView(Math.pow(10, 18) * value)}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputData">{t("Data")}</label>
                    <textarea className="form-control"
                              id="inputData"
                              rows={2}
                              {...this.getInputProps('data')}/>
                    {validatedData
                        ? null
                        : <small className="form-text text-danger">{dataErrorMessage}</small>
                    }
                </div>
            </div>
        )
    }
}

export default EthereumTransactionFrom;
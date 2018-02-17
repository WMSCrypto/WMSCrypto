import React, { Component } from 'react';
import Card from "../Cards/Card";
import NextButton from "../NextButton";
import { hexView, getETXTxData } from "../../utils";
import { t } from '../../utils/translate';

const intTest = (v) => v ? /^\d+$/.test(v) : true;
const addressTest = (v) => v ? /^0x[\da-fA-F]{40}$/.test(v) : false;
const hexTest = (v) => v ? /^0x[\da-fA-F]*$/.test(v) : true;
const valueTest = (v) => v ? /^\d+\.?\d{0,18}$/.test(v) : true;

class EthereumTransactionFrom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nonce: props.nonce || 0,
            gasPrice: props.gasPrice || 0,
            gasLimit: props.gasLimit || 0,
            to: props.to || '',
            value: props.value || 0,
            data: props.data || '',
            edit: true
        }
    }

    getInputProps(name, validator) {
        const { state } = this;
        return {
            value: state[name],
            onChange: (e) => {
                let obj = {};
                let { value } = e.target;
                if (validator) {
                    value = validator(value) ? value : state[name];
                }
                obj[name] = value;
                this.setState(obj)
            },
            disabled: !state.edit
        };
    }
    save() {
        const { onSave } = this.props;
        const { nonce, value, gasPrice, gasLimit, to, data } = this.state;
        this.setState({edit: false}, () => onSave(getETXTxData(
            nonce, value, gasPrice, gasLimit, to, data
        )))
    }

    render() {
        if (parseInt(this.props.coin, 10) !== 60) {
            return null
        }

        const { nonce, gasPrice, gasLimit, to, value, data, edit } = this.state;
        const validatedTo = addressTest(to);
        const validatedData = hexTest(data);
        const toErrorMessage = !validatedTo ? 'Address must start with 0x, be 0-9, a-f, A-F and len 40' : null;
        const dataErrorMessage = !validatedData ? 'Data must start with 0x, be 0-9, a-f, A-F' : null;
        return(
            <div>
                <Card>
                    <p>Ethereum transaction form</p>
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
                </Card>
                <br/>
                <div className="save-edit-btns">
                    <NextButton title={t("Save transaction")}
                                disabled={!validatedTo || !validatedData || !edit}
                                onClick={() => this.save()}/>
                    <button type="button" className="btn btn-secondary" disabled={edit}
                            onClick={() => this.setState({edit: true})}>
                        {t("Edit transaction")}
                    </button>
                </div>
                <br/>
            </div>
        )
    }
}

export default EthereumTransactionFrom;
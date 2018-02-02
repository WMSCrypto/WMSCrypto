import React, { Component } from 'react';
import Card from "../Card";
import NextButton from "../NextButton";

const intTest = (v) => v ? /^\d+$/.test(v) : true;
const addressTest = (v) => v ? /^[\da-fA-F]{40}$/.test(v) : false;
const hexTest = (v) => v ? /^[\da-fA-F]*$/.test(v) : true;
const hexView = (v) => `0x${v !== '' ? parseInt(v).toString(16) : ''}`;

class EthereumTransactionFrom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nonce: 0,
            gasPrice: 0,
            gasLimit: 0,
            to: '',
            value: 0,
            data: '',
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

    render() {
        if (parseInt(this.props.coin, 10) !== 60) {
            return null
        }

        const { nonce, gasPrice, gasLimit, to, value, data, edit } = this.state;
        const validatedTo = addressTest(to);
        const validatedData = hexTest(data);
        const toErrorMessage = !validatedTo ? 'Address must be 0-9, a-f, A-F and len 40' : null;
        const dataErrorMessage = !validatedData ? 'Data must be 0-9, a-f, A-F' : null;
        return(
            <div>
                <Card>
                    <p>Ethereum transaction form</p>
                    <div className="form-group">
                        <label htmlFor="inputNonce">Nonce</label>
                        <input type="text"
                               className="form-control"
                               id="inputNonce"
                               required={true}
                               {...this.getInputProps('nonce', intTest)}/>
                        <small className="form-text text-muted">{hexView(nonce)}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputGasPrice">Gas price</label>
                        <input type="text"
                               className="form-control"
                               id="inputGasPrice"
                               required={true}
                               {...this.getInputProps('gasPrice', intTest)}/>
                        <small className="form-text text-muted">{hexView(gasPrice)}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputGasLimit">Gas limit</label>
                        <input type="text"
                               className="form-control"
                               id="inputGasLimit"
                               required={true}
                               {...this.getInputProps('gasLimit', intTest)}/>
                        <small className="form-text text-muted">{hexView(gasLimit)}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputTo">To, 0x</label>
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
                        <label htmlFor="inputValue">Value</label>
                        <input type="text"
                               className="form-control"
                               id="inputValue"
                               required={true}
                               {...this.getInputProps('value', intTest)}/>
                        <small className="form-text text-muted">{hexView(value)}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputData">Data, 0x</label>
                        <textarea className="form-control"
                                  id="inputData"
                                  rows={4}
                                  {...this.getInputProps('data')}/>
                        {validatedData
                            ? null
                            : <small className="form-text text-danger">{dataErrorMessage}</small>
                        }
                    </div>
                </Card>
                <br/>
                <div className="save-edit-btns">
                    <NextButton title="Save transaction"
                                disabled={!validatedTo || !validatedData || !edit}
                                onClick={() => this.setState({edit: false})}/>
                    <button type="button" className="btn btn-secondary" disabled={edit}
                            onClick={() => this.setState({edit: true})}>
                        Edit transaction
                    </button>
                </div>
                <br/>
            </div>
        )
    }
}

export default EthereumTransactionFrom;
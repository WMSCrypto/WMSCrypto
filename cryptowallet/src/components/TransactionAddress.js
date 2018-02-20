import React, { Component } from 'react';
import { getFullAdrress } from '../utils'

const intTest = (v) => v ? /^\d+$/.test(v) : true;


class TransactionAddress extends Component {

    constructor(props) {
        super(props);
        const { coin, purpose, account, change, address } = props;
        this.state = {
            purpose: purpose || "44",
            coin: coin || "0",
            account: account || "0",
            change: change || "0",
            address: address || "0"
        }
    }

    componentWillMount() {
        this.props.onSet({
            coin: this.state.coin,
            fullAddress: getFullAdrress(this.state),
            addressData: this.state
        })
    }

    getInputProps(name, validator) {
        const { state } = this;
        const { onSet } = this.props;
        return {
            value: state[name],
            onChange: (e) => {
                let obj = {};
                let { value } = e.target;
                if (validator) {
                    value = validator(value) ? value : state[name];
                }
                obj[name] = value;
                state[name] = value;
                this.setState(obj, onSet({
                    coin: state.coin,
                    fullAddress: getFullAdrress(state),
                    addressData: state
                }))
            }
        }
    }

    render() {
        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputAccount">Account</label>
                        <input type="text"
                               className="form-control"
                               id="inputAccount"
                               required={true}
                               {...this.getInputProps('account', intTest)}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputChange">Change</label>
                        <select id="inputChange"
                                className="form-control"
                                {...this.getInputProps('change')}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text"
                               className="form-control"
                               id="inputAddress"
                               required={true}
                               {...this.getInputProps('address', intTest)}/>
                    </div>
                </div>
                <p>{getFullAdrress(this.state)}</p>
            </div>
        )
    }
}

export default TransactionAddress;
import React, { Component } from 'react';
import CoinsList from "./CoinsList";
import Card from "./Cards/Card";

const intTest = (v) => v ? /^\d+$/.test(v) : true;

const getFullAdrress = (obj) => {
    return `m/44'/${obj.coin}'/${obj.account}'/${obj.change}/${obj.address}`
};

class TransactionAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coin: props.coin ? parseInt(props.coin, 10) : 0,
            account: props.account || 0,
            change: props.change || 0,
            address: props.address || 0
        }
    }

    componentWillMount() {
        this.props.onSet({
            coin: this.state.coin,
            fullAddress: getFullAdrress(this.state)
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
                    fullAddress: getFullAdrress(state)
                }))
            }
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CoinsList {...this.getInputProps('coin')} filterKey="txEnable"/>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label htmlFor="inputAccount">Account</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputAccount"
                                   required={true}
                                   {...this.getInputProps('account', intTest)}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputChange">Change</label>
                            <select id="inputChange"
                                    className="form-control"
                                    {...this.getInputProps('change')}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text"
                                   className="form-control"
                                   id="inputAddress"
                                   required={true}
                                   {...this.getInputProps('address', intTest)}/>
                        </div>
                    </div>
                    <p>{getFullAdrress(this.state)}</p>
                </Card>
                <br/>
            </div>
        )
    }
}

export default TransactionAddress
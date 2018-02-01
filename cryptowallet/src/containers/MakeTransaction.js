import React, { Component } from 'react';
import { TransactionAddress } from "../components";
import { EthereumTransactionFrom } from '../components/TransactionForms';


class MakeTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromData: {coin: "0"},
        }
    }

    render() {
        const { fromData } = this.state;
        console.log(this.state)
        return (
            <div>
                <TransactionAddress coin={fromData.coin} onSet={(obj) => this.setState({fromData: obj})}/>
                <EthereumTransactionFrom coin={fromData.coin}/>
            </div>
        )
    }
}

export default MakeTransaction;
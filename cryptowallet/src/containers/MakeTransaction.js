import React, { Component } from 'react';
import { TransactionAddress, MnemonicsInput } from "../components";
import { EthereumTransactionFrom } from '../components/TransactionForms';


class MakeTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromData: {coin: "0"},
            decryptedMnemonics: null
        }
    }

    render() {
        const { fromData, decryptedMnemonics } = this.state;
        return (
            <div>
                <TransactionAddress coin={fromData.coin} onSet={(obj) => this.setState({fromData: obj})}/>
                <EthereumTransactionFrom coin={fromData.coin}/>
                <MnemonicsInput encrypted={true}
                                buttonLabel="Decrypt mnemonics"
                                passwordLabel="Password"
                                mnemonicsLabel="Mnemonics"
                                onValidate={(d) => this.setState({decryptedMnemonics: d})}
                                disabled={!!decryptedMnemonics}/>
                <br/>
            </div>
        )
    }
}

export default MakeTransaction;
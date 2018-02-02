import React, { Component } from 'react';
import { TransactionAddress, MnemonicsInput, TxSigner } from "../components";
import { EthereumTransactionFrom } from '../components/TransactionForms';


class MakeTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromData: {coin: "0", fullAddress: null},
            decryptedMnemonics: null,
            txData: null,
        }
    }

    render() {
        const { fromData, decryptedMnemonics, txData } = this.state;
        return (
            <div>
                <TransactionAddress coin={fromData.coin} onSet={(obj) => this.setState({fromData: obj})}/>
                <EthereumTransactionFrom coin={fromData.coin}
                                         onSave={(d) => this.setState({txData: d})}/>
                <MnemonicsInput encrypted={true}
                                buttonLabel="Decrypt mnemonics"
                                passwordLabel="Password"
                                mnemonicsLabel="Mnemonics"
                                onValidate={(d) => this.setState({decryptedMnemonics: d})}
                                disabled={!!decryptedMnemonics}/>

                <br/>
                <TxSigner mnemonics={decryptedMnemonics}
                          address={fromData.fullAddress}
                          coin={fromData.coin}
                          txData={txData}/>
                <br/>
            </div>
        )
    }
}

export default MakeTransaction;
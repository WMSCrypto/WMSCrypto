import React, { Component } from 'react';
import { TransactionAddress, MnemonicsInput, TxSigner } from "../components";
import { EthereumTransactionFrom } from '../components/TransactionForms';
import Card from "../components/Cards/Card";
import DownloadButton from "../components/DownloadButton";
import {t} from "../utils/translate";


class MakeTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromData: {
                coin: "60",
                fullAddress: null,
                addressData: null
            },
            decryptedMnemonics: null,
            txData: null,
        }
    }

    render() {
        const { fromData, decryptedMnemonics, txData } = this.state;
        const { data, uuid, encryptedMnemonics, onOperationResult } = this.props;
        const txParams = (data && data.txParams) ? data.txParams : {};
        return (
            <div>
                <TransactionAddress coin={fromData.coin}
                                    {...data}
                                    onSet={(obj) => this.setState({fromData: obj, txData: null})}/>
                <EthereumTransactionFrom coin={fromData.coin}
                                         {...txParams}
                                         onSave={(d) => this.setState({txData: d})}/>
                <MnemonicsInput encrypted={true}
                                buttonLabel="Decrypt mnemonics"
                                passwordLabel="Password"
                                mnemonicsLabel="Mnemonics"
                                uuid={uuid}
                                encryptedMnemonics={encryptedMnemonics}
                                onValidate={(d) => this.setState({decryptedMnemonics: d})}
                                disabled={!!decryptedMnemonics}/>

                <br/>
                <TxSigner mnemonics={decryptedMnemonics}
                          address={fromData.fullAddress}
                          addressData={fromData.addressData}
                          uuid={uuid}
                          txData={txData}
                          onOperationResult={onOperationResult}/>
                <br/>
            </div>
        )
    }
}

export default MakeTransaction;
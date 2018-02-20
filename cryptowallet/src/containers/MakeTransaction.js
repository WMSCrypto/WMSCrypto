import React, { Component } from 'react';
import { TransactionAddress, MnemonicsInput, TxSigner } from "../components";
import { EthereumTransactionFrom } from '../components/TransactionForms';
import Card from "../components/Cards/Card";
import DownloadButton from "../components/DownloadButton";
import {t} from "../utils/translate";
import BitcoinTransactionForm from "../components/TransactionForms/BitcoinTransactionForm";
import CoinsList from "../components/CoinsList";
import CommonBitcoinTransactionForm from "../components/TransactionForms/BitcoinTransactionForm/CommonBitcoinTransactionForm";


class MakeTransaction extends Component {

    constructor(props) {
        super(props);
        let data = {};
        if (props.data) {
            data = props.data
        }
        const { purpose, coin, address, change, account } = data;
        this.state = {
            purpose: purpose ? purpose.toString() : "44",
            coin: coin ? coin.toString() : "0",
            address: address ? address.toString() : "0",
            change: change ? change.toString() : "0",
            account: account ? account.toString(): "0",
            fromData: {
                coin: "60",
                fullAddress: null,
                addressData: null
            },
            isFile: false,
            isManual: false,
            isOnline: !!props.uuid,
            decryptedMnemonics: null,
            txData: null,
        }
    }

    renderAdditional(coin) {
        switch (coin) {
            case "0":
                const { isFile, isManual, isOnline } = this.state;
                const notChoised = !(isFile || isManual || isOnline);
                const onUpload = notChoised
                    ? (d) => {this.setState({txData: d, isFile: true})}
                    : null;
                const onManual = notChoised
                    ? () => {this.setState({isManual: true})}:
                    null;
                console.log(onUpload, onManual);

                return <CommonBitcoinTransactionForm onUploadFile={onUpload}
                                                     onSetManual={onManual}/>;
            case "60":
                const { address, account, change, purpose } = this.state;
                return (
                    <TransactionAddress coin={coin}
                                        address={address}
                                        account={account}
                                        change={change}
                                        purpose={purpose}
                                        onSet={(key, value) => {
                                            const obj = {};
                                            obj[key] = value;
                                            this.setState(obj)
                                        }}/>
                );
            default:
                return null
        }
    }

    render() {
        const { coin, fromData, decryptedMnemonics, txData } = this.state;
        const { data, uuid, encryptedMnemonics, onOperationResult } = this.props;
        const txParams = (data && data.txParams) ? data.txParams : {};
        return (
            <div>
                <Card>
                    <CoinsList onChange={(e) => this.setState({coin: e.target.value})}
                               value={coin}
                               filterKey="txEnable"
                               disabled={!!uuid}/>
                    {this.renderAdditional(coin)}
                </Card>
                <br/>
                <EthereumTransactionFrom coin={coin}
                                         {...txParams}
                                         onSave={(d) => this.setState({txData: d})}/>
                <BitcoinTransactionForm coin={coin}
                                        {...txParams}/>
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
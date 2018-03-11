import React, { Component } from 'react';
import { MnemonicsInput, CreatePassword, NextButton, Card, DownloadButton, LastStep, SaveOnlyKeys } from '../components/index';
import aes from "crypto-js/aes";
import AccountsGenerator from "../components/AccountsGenerator";
import { messages } from "../assets";
import { sendPut, encryptMnemonicsByAnchor } from "../utils";

import { t } from '../utils/translate';

class ConnectWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonicsData: null,
            password: null,
            aesPassword: null,
            encryptedMnemonics: null,
            accounts: null,
            allowSend: false
        }
    }

    generateMnemonics() {
        const { aesPassword, mnemonicsData } = this.state;
        const encryptedMnemonics = aes.encrypt(JSON.stringify({
            mnemonics: mnemonicsData.mnemonics,
            salt: mnemonicsData.password
        }), aesPassword);
        this.setState({
            encryptedMnemonics
        })
    }

    render() {
        const { aesPassword, mnemonicsData, encryptedMnemonics, accounts, allowSend } = this.state;
        const { uuid, onOperationResult } = this.props;
        return(
            <div>
                <MnemonicsInput encrypted={false}
                                mnemonicsLabel="Mnemonics"
                                passwordLabel="Passphrase"
                                buttonLabel="Create mnemonics seed"
                                disabled={!!mnemonicsData}
                                onValidate={(data) => this.setState({mnemonicsData: data})}/>
                <br/>
                {mnemonicsData ? <CreatePassword setPassword={(p) => {this.setState({aesPassword: p})}}
                                                 disabled={!!encryptedMnemonics}/> : null}
                <br/>
                {mnemonicsData
                    ? <NextButton title={t("Encrypt mnemonics")}
                                  disabled={!aesPassword || encryptedMnemonics}
                                  onClick={() => this.generateMnemonics()}/>
                    : null
                }
                <br/>
                {encryptedMnemonics
                    ? <Card><DownloadButton title={t("Download encrypted mnemonics")}
                                            id="encryptedMnemonics"
                                            obj={{
                                                encryptedMnemonics: encryptedMnemonics.toString(),
                                                version: '0.1'
                                            }}/></Card>
                    : null
                }
                <br/>
                {encryptedMnemonics
                    ? <AccountsGenerator onGenerate={(accounts) => this.setState({accounts})}
                                         disabled={!!accounts}
                                         uuid={uuid}
                                         hex={mnemonicsData.hex}/>
                    : null
                }
                <br/>
                {accounts && uuid
                    ? <LastStep title={t("Save mnemonics")}
                                hide={false}
                                important={true}
                                message={messages.SAVE_WALLETS}
                                approveCallback={(b) => this.setState({allowSend: b})}
                                onClick={() =>{sendPut(
                                    uuid,
                                    {
                                        accounts: accounts.map(e => [e.coin.id, e.node.neutered().toBase58()]),
                                        encryptedMnemonics: encryptMnemonicsByAnchor(encryptedMnemonics)
                                    },
                                    (status, data, uuid) => onOperationResult(status)
                                )}}>
                        <span> </span>
                        <SaveOnlyKeys accounts={accounts}
                                      uuid={uuid}
                                      disabled={!allowSend}
                                      onOperationResult={onOperationResult}/>
                    </LastStep>
                    : null
                }
                <br/>
            </div>
        )
    }
}

export default ConnectWallet;

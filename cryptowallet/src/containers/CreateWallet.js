import React, { Component } from 'react';
import bip39 from 'bip39';
import aes from 'crypto-js/aes';
import { NextButton, MnemonicsView, Card, LastStep , AccountsGenerator, SaveOnlyKeys } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import { t } from '../utils/translate';
import { sendPut, encryptMnemonicsByAnchor, generateSeed } from '../utils';
import WalletImageGenerator from "../components/WalletImage/WalletImageGenerator";

class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            mnemonics: null,
            encryptedMnemonics: null,
            accounts: null,
            allowSend: false,
            seed: null
        };
    }

    generateSeed() {
        const { password } = this.state;
        const seed = generateSeed({ password });
        this.setState({ seed })
    }

    render() {
        const { password, encryptedMnemonics, mnemonics, accounts, allowSend, seed } = this.state;
        const { uuid, onOperationResult } = this.props;
        return (
            <div>
                <CreatePassword setPassword={(p) => {this.setState({password: p})}}
                                disabled={!!mnemonics}>
                    <p className="text-muted">{messages.SAVE_MNEMONICS}</p>
                </CreatePassword>
                <NextButton title={t("Generate mnemonics")}
                            disabled={!password || seed}
                            onClick={() => this.generateSeed()}/>
                <br/>
                {seed ? <WalletImageGenerator seed={seed}/> : null}
                {mnemonics && <AccountsGenerator disabled={!mnemonics || accounts}
                                                 mnemonics={mnemonics}
                                                 uuid={uuid}
                                                 onGenerate={(accounts) => this.setState({accounts})}/>
                }
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
                                    onOperationResult
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

export default CreateWallet;
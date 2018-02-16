import React, { Component } from 'react';
import bip39 from 'bip39';
import aes from 'crypto-js/aes';
import { NextButton, MnemonicsView, Card, LastStep , AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import { t } from '../utils/translate';
import { sendPut } from '../utils';

const MNEMONICS_BITS = 256;

class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            mnemonics: null,
            encryptedMnemonics: null,
            accounts: null,
        };
    }

    generateMnemonics() {
        const mnemonics = bip39.generateMnemonic(MNEMONICS_BITS);
        const { password } = this.state;
        const encryptedMnemonics = aes.encrypt(mnemonics, password);
        this.setState({
            mnemonics,
            encryptedMnemonics
        })
    }

    render() {
        const { password, encryptedMnemonics, mnemonics, accounts } = this.state;
        const { uuid, onOperationResult } = this.props;
        return (
            <div>
                <CreatePassword setPassword={(p) => {this.setState({password: p})}}
                                disabled={!!mnemonics}>
                    <p className="text-muted">{messages.SAVE_MNEMONICS}</p>
                </CreatePassword>
                <br/>
                <NextButton title={t("Generate mnemonics")}
                            disabled={!password || mnemonics}
                            onClick={() => this.generateMnemonics()}/>
                <br/>
                <Card hide={!(password && mnemonics)}>
                    <MnemonicsView mnemonics={password && mnemonics}
                                   encryptedMnemonics={encryptedMnemonics}
                                   bits={MNEMONICS_BITS}/>
                </Card>
                <br/>
                {(mnemonics && uuid) && <AccountsGenerator disabled={!mnemonics || accounts}
                                                 mnemonics={mnemonics}
                                                 onGenerate={(accounts) => this.setState({accounts})}/>
                }
                {accounts && uuid
                    ? <LastStep title={t("Save mnemonics")}
                                hide={false}
                                important={true}
                                message={messages.SAVE_WALLETS}
                                onClick={() =>{sendPut(
                                    uuid,
                                    {
                                        accounts: accounts.map(e => [e.coin.id, e.node.neutered().toBase58()]),
                                        encryptedMnemonics: encryptedMnemonics.toString()
                                    },
                                    onOperationResult
                                )}}/>
                    : null
                }
                <br/>
            </div>
        )

    }
}

export default CreateWallet;
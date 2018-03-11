import React, { Component } from 'react';
import bip39 from 'bip39';
import aes from 'crypto-js/aes';
import { NextButton, MnemonicsView, Card, LastStep , AccountsGenerator, SaveOnlyKeys } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import { t } from '../utils/translate';
import { sendPut, encryptMnemonicsByAnchor } from '../utils';
import Identicon from "../elements/IdenticonView";
import GeneratedImage from "../components/GeneratedImageView";

const MNEMONICS_BITS = 256;
const generateSeed = () => {
    const mnemonics = bip39.generateMnemonic(MNEMONICS_BITS);
    return bip39.mnemonicToSeed(mnemonics);
};

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

    generateMnemonics() {
        const mnemonics = bip39.generateMnemonic(MNEMONICS_BITS);
        const { password } = this.state;
        const encryptedMnemonics = aes.encrypt(mnemonics, password);
        this.setState({
            mnemonics,
            encryptedMnemonics
        })
    }

    generateImage() {
        this.setState({
            seed: generateSeed()
        })
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
                            onClick={() => this.generateImage()}/>
                <br/>
                <GeneratedImage/>
                <Card hide={!(password && seed)}>
                    <Identicon seed={seed ? seed.toString() : null}/>
                </Card>
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
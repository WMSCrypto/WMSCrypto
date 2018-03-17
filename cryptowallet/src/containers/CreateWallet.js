import React, { Component } from 'react';
import { NextButton, LastStep , AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import { t } from '../utils/translate';
import { sendPut, generateSeedWithCheckAnchor } from '../utils';
import WalletImageGenerator from "../components/WalletImage/WalletImageGenerator";

class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            accounts: null,
            seed: null
        };
    }

    _generateSeed() {
        const { password } = this.state;
        const seed = generateSeedWithCheckAnchor(password);
        this.setState({ seed })
    }

    _onSave() {
        const { accounts } = this.state;
        const { onOperationResult, uuid } = this.props;
        sendPut(
            uuid,
            {accounts: accounts.map(e => [e.coin.id, e.node.neutered().toBase58()])},
            onOperationResult)
    }

    render() {
        const { password, accounts, seed } = this.state;
        const { uuid } = this.props;
        return (
            <div>
                <CreatePassword setPassword={(p) => {this.setState({password: p})}}
                                disabled={!!seed}>
                    <p className="text-muted">{t(messages.SAVE_MNEMONICS)}</p>
                </CreatePassword>
                <NextButton title={t("Generate mnemonics")}
                            disabled={!password || seed}
                            onClick={() => this._generateSeed()}/>
                <br/>
                {seed ? <WalletImageGenerator seed={seed}/> : null}
                {seed && <AccountsGenerator disabled={!seed || accounts}
                                            hex={seed.hex}
                                            uuid={uuid}
                                            onGenerate={(accounts) => this.setState({accounts})}/>
                }
                {accounts && uuid
                    ? <LastStep title={t("Save accounts")}
                                hide={false}
                                important={true}
                                message={t(messages.SAVE_WALLETS)}
                                onClick={() =>{this._onSave()}}/>
                    : null
                }
                <br/>
            </div>
        )
    }
}

export default CreateWallet;
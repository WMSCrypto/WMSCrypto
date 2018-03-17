import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NextButton, LastStep , AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import { t } from '../utils/translate';
import { sendPut, generateSeedWithCheckAnchor, enctryptSeedWithCheckAnchor } from '../utils';
import WalletImageGenerator from "../components/WalletImage/WalletImageGenerator";

class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            accounts: null,
            seed: null,
            generated: false
        };
        this._generateSeed = this._generateSeed.bind(this);
        this._onSave = this._onSave.bind(this);
    }

    _generateSeed() {
        const { password } = this.state;
        const { seed } = this.props;
        let seedObj;
        if (seed) {
            seedObj = {
                hex: seed,
                encrypted: enctryptSeedWithCheckAnchor(seed, password)
            }
        } else {
            seedObj = generateSeedWithCheckAnchor(password);

        }
        this.setState({ seed: seedObj, generated: true })
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
        const { accounts, seed, generated } = this.state;
        const { uuid } = this.props;
        return (
            <div>
                <CreatePassword setPassword={(p) => {this.setState({password: p})}}
                                disabled={generated}>
                    <p className="text-muted">{t(messages.SAVE_MNEMONICS)}</p>
                </CreatePassword>
                {!generated
                    ? <NextButton title={t("Create wallet")} onClick={this._generateSeed}/>
                    : null
                }
                {generated ? <WalletImageGenerator seed={seed}/> : null}
                {generated && <AccountsGenerator disabled={!seed || accounts}
                                            hex={seed.hex}
                                            uuid={uuid}
                                            onGenerate={(accounts) => this.setState({accounts})}/>
                }
                {accounts && uuid
                    ? <LastStep title={t("Save accounts")}
                                hide={false}
                                important={true}
                                message={t(messages.SAVE_WALLETS)}
                                onClick={this._onSave}/>
                    : null
                }
                <br/>
            </div>
        )
    }
}

CreateWallet.propTypes = {
    seed: PropTypes.string,
    uuid: PropTypes.string,
    onOperationResult: PropTypes.func
};

export default CreateWallet;
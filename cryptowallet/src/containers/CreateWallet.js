import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NextButton, LastStepButton , AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import T from "../components/T";
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
        const { password, accounts, seed, generated } = this.state;
        const { uuid } = this.props;
        return (
            <div>
                <CreatePassword setPassword={(p) => {this.setState({password: p})}}
                                disabled={generated}>
                    <p className="text-muted"><T>{messages.SAVE_MNEMONICS}</T></p>
                </CreatePassword>
                {!generated
                    ? <NextButton title="Create wallet"
                                  onClick={this._generateSeed}
                                  disabled={!password}/>
                    : null
                }
                {generated ? <WalletImageGenerator seed={seed}/> : null}
                {generated && <AccountsGenerator disabled={!seed || accounts}
                                            hex={seed.hex}
                                            uuid={uuid}
                                            onGenerate={(accounts) => this.setState({accounts})}/>
                }
                {accounts && uuid
                    ? <LastStepButton title="Save accounts"
                                      hide={false}
                                      important={true}
                                      message={messages.SAVE_WALLETS}
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
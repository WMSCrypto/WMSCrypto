import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LastStepButton , AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import T from "../components/T";
import { sendPut } from '../utils';
import WalletImageGenerator from "../components/WalletImage/WalletImageGenerator";
import MnemonicsList from "../components/mnemonics/MnemonicsGenerator";
import define from "../core/define";
import CreateImage from "../components/CreateImage";

class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: null,
            seed: null,
            generated: false
        };
        this._onSave = this._onSave.bind(this);
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
                <CreatePassword first={true} next={define.steps.generateMnemonics}>
                    <p className="text-muted">
                        <T>{messages.SAVE_MNEMONICS}</T>
                    </p>
                </CreatePassword>
                <MnemonicsList next={define.steps.image}/>
                {/*<CreateImage next={define.steps.askMnemonic}/>*/}
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
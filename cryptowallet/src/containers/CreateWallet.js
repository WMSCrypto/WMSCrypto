import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LastStepButton , AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import T from "../components/T";
import { sendPut } from '../utils';
import MnemonicsList from "../components/mnemonics/MnemonicsGenerator";
import define from "../core/define";
import CreateImage from "../components/CreateImage";
import MnemonicCheck from "../components/mnemonics/styles/MnemonicCheck";

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
        const { accounts } = this.state;
        const { uuid } = this.props.common;
        return (
            <div>
                <CreatePassword first={true} next={define.steps.generateMnemonics}>
                    <small className="text-muted"><T>{messages.SAVE_MNEMONICS}</T></small>
                </CreatePassword>
                <MnemonicsList next={define.steps.askMnemonic}/>
                <MnemonicCheck next={define.steps.generateImage}/>
                <CreateImage next={define.steps.generateXpub} last={!uuid}/>
                <AccountsGenerator next={define.steps.saveWallets} onlyOnline={true}/>
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
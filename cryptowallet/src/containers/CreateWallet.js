import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import { messages } from '../assets';
import T from "../components/T";
import { sendPut } from '../utils';
import MnemonicsList from "../components/mnemonics/MnemonicsGenerator";
import define from "../core/define";
import CreateImage from "../components/CreateImage";
import MnemonicCheck from "../components/mnemonics/styles/MnemonicCheck";
import SaveWallets from "../components/results/SaveWallets"
import StepCounter from "../components/steps/StepCounter";


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
        const { uuid } = this.props.common;
        return (
            <StepCounter>
                <CreatePassword first={true} next={define.steps.generateMnemonics}>
                    <small className="text-muted"><T>{messages.SAVE_MNEMONICS}</T></small>
                </CreatePassword>
                <MnemonicsList next={define.steps.askMnemonic}/>
                <MnemonicCheck next={define.steps.generateImage}/>
                <CreateImage next={!!uuid && define.steps.generateXpub}/>
                <AccountsGenerator next={define.steps.saveWallets} onlyOnline={true}/>
                <SaveWallets onlyOnline={true} controls={false} last={true}/>
            </StepCounter>
        )
    }
}

CreateWallet.propTypes = {
    seed: PropTypes.string,
    uuid: PropTypes.string,
    onOperationResult: PropTypes.func
};

export default CreateWallet;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StepCounter from "../components/steps/StepCounter";
import define from "../core/define";
import CreatePassword from "../components/CreatePassword";
import CreateImage from "../components/CreateImage";
import AccountsGenerator from "../components/AccountsGenerator";
import SaveWallets from "../components/results/SaveWallets";
import MnemonicsInput from "../components/mnemonics/MnemonicsInput";

class ConnectWallet extends Component {

    render() {
        const { uuid } = this.props.common;
        return(
            <StepCounter>
                <MnemonicsInput first={true} next={define.steps.createPassword}/>
                <CreatePassword next={define.steps.generateImage}/>
                <CreateImage next={!!uuid && define.steps.generateXpub}/>
                <AccountsGenerator next={define.steps.saveWallets} onlyOnline={true}/>
                <SaveWallets onlyOnline={true} controls={false} last={true}/>
            </StepCounter>
        )
    }
}

ConnectWallet.propTypes = {
    uuid: PropTypes.string,
    onOperationResult: PropTypes.func
};

export default ConnectWallet;

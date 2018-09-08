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
                <CreateImage next={define.steps.generateXpub}/>
                <AccountsGenerator next={uuid && define.steps.saveWallets} last={!uuid} controls={false}/>
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

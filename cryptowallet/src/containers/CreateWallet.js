import React from 'react';
import PropTypes from 'prop-types';
import { AccountsGenerator } from '../components';
import CreatePassword from "../components/CreatePassword";
import MnemonicsList from "../components/mnemonics/MnemonicsGenerator";
import define from "../core/define";
import CreateImage from "../components/CreateImage";
import MnemonicCheck from "../components/mnemonics/MnemonicCheck";
import SaveWallets from "../components/results/SaveWallets"
import StepCounter from "../components/steps/StepCounter";


const CreateWallet  = ({ common }) => {
    const { uuid } = common;
    return (
        <StepCounter>
            <CreatePassword first={true} next={define.steps.generateMnemonics}/>
            <MnemonicsList next={define.steps.askMnemonic}/>
            <MnemonicCheck next={define.steps.generateImage}/>
            <CreateImage next={!!uuid && define.steps.generateXpub}/>
            <AccountsGenerator next={define.steps.saveWallets} onlyOnline={true}/>
            <SaveWallets onlyOnline={true} controls={false} last={true}/>
        </StepCounter>
    )
};

CreateWallet.propTypes = {
    common: PropTypes.object,
};

export default CreateWallet;
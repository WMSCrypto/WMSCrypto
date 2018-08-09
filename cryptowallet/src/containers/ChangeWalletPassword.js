import React from 'react';
import { CreatePassword } from '../components';
import WalletImageReader from "../components/WalletImage/WalletImageReader";
import define from "../core/define";
import CreateImage from "../components/CreateImage";
import StepCounter from "../components/steps/StepCounter";
import SaveNewPassword from "../components/results/SaveNewPassword";

const ChangeWalletPassword = ({ common }) => {
    const { uuid } = common;
    return (
        <StepCounter>
            <WalletImageReader first={true} next={define.steps.createPassword}/>
            <CreatePassword next={define.steps.generateImage}/>
            <CreateImage next={!!uuid && define.steps.saveNewPassword}/>
            <SaveNewPassword onlyOnline={true} last={true} controls={false}/>
        </StepCounter>
    )
};
export default ChangeWalletPassword;

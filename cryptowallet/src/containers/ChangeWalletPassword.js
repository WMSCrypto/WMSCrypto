import React, { Component } from 'react';
import { CreatePassword } from '../components';
import WalletImageReader from "../components/WalletImage/WalletImageReader";
import define from "../core/define";
import CreateImage from "../components/CreateImage";
import StepCounter from "../components/steps/StepCounter";

class ChangeWalletPassword extends Component {

    render() {
        return (
        <StepCounter>
            <WalletImageReader first={true} next={define.steps.createPassword}/>
            <CreatePassword next={define.steps.generateImage}/>
            <CreateImage next={null} last={true}/>
        </StepCounter>
        )
    }
}

export default ChangeWalletPassword;

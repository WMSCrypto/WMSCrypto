import React, { Component } from 'react';
import define from "../core/define";
import { generateSeedObj } from '../core/crypto';
import WalletImageGenerator from "./WalletImage/WalletImageGenerator";
import stepWrapper from "../core/stepWrapper";

class CreateImage extends Component {

    componentWillMount() {
        const { name, getStepResult, setResult } = this.props;
        if (!getStepResult(name)) {
            setResult(generateSeedObj({
                password: getStepResult(define.steps.createPassword),
                mnemonics: getStepResult(define.steps.generateMnemonics)
            }))
        }
    }

    render() {
        const { result } = this.props;
        return result ? <WalletImageGenerator seed={result}/> : null
    }
}

export default stepWrapper(define.steps.generateImage)(CreateImage);

import React, { Component } from 'react';
import define from "../core/define";
import { generateSeedObj } from '../core/crypto';
import WalletImageGenerator from "./WalletImage/WalletImageGenerator";
import stepWrapper from "../core/stepWrapper";

class CreateImage extends Component {

    componentWillMount() {
        let mnemonics;
        let salt = null;
        const { name, getStepResult, setResult, steps } = this.props;
        const { anchor } = this.props.common;
        if (steps.components[define.steps.setMnemonics]) {
            const r = getStepResult(define.steps.setMnemonics);
            mnemonics = r.mnemonic;
            salt = salt !== '' ? salt : null
        } else {
            mnemonics = getStepResult(define.steps.generateMnemonics);
        }
        if (!getStepResult(name)) {
            setResult(generateSeedObj({
                password: getStepResult(define.steps.createPassword),
                seed: getStepResult(define.steps.unlockKey),
                mnemonics,
                salt,
                anchor
            }))
        }
    }

    render() {
        const { result } = this.props;
        return result ? <WalletImageGenerator seed={result}/> : null
    }
}

export default stepWrapper(define.steps.generateImage)(CreateImage);

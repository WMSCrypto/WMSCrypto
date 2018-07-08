import React, { Component } from 'react';
import define from "../core/define";
import { generateSeedObj } from '../core/crypto';
import WalletImageGenerator from "./WalletImage/WalletImageGenerator";
import stepWrapper from "../core/stepWrapper";
import T from "./T";

class CreateImage extends Component {

    componentWillMount() {
        let mnemonics;
        let salt = null;
        const { name, getStepResult, setResult, steps } = this.props;
        const { anchor, newAnchor } = this.props.common;
        if (steps.components[define.steps.setMnemonics.name]) {
            const r = getStepResult(define.steps.setMnemonics);
            mnemonics = r.mnemonics;
            salt = r.salt !== '' ? r.salt : null
        } else {
            mnemonics = getStepResult(define.steps.generateMnemonics);
        }
        if (!getStepResult(name)) {
            setResult(generateSeedObj({
                password: getStepResult(define.steps.createPassword),
                seed: getStepResult(define.steps.unlockKey),
                anchor: newAnchor || anchor,
                mnemonics,
                salt,
            }))
        }
    }

    render() {
        const { result } = this.props;
        return result
            ? <div>
                <p><T>QR Key is required for day-to-day use of your wallet. Take a screenshot or save it as a photo.</T></p>
                <WalletImageGenerator seed={result}/>
                <p><small><T>*QR Key is protected by your password and password of WMSCrypto, thus it may be safely kept on the devices with Internet access</T></small></p>
              </div>
            : null
    }
}

export default stepWrapper(define.steps.generateImage)(CreateImage);

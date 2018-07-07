import React, { Component } from 'react';
import define from "../../core/define";
import { generateMnemonics } from '../../core/crypto/index';
import stepWrapper from '../../core/stepWrapper';
import T from "../T";
import './styles/MnemonicsList.css';

const generateList = (result) => {
    return result.split(' ').map((word, i) => <div key={`mnemonic-id-${i}`}><span className="text-muted">{i+1}.</span> {word}</div>)
};

class MnemonicsGenerator extends Component {

    componentWillMount() {
        const { result } = this.props;
        if (!result) {
            this.props.setResult(generateMnemonics())
        }
    }

    render() {
        const { result } = this.props;
        return (
            <div>
            <p><T>Make sure to write down the recovery phrase and keep it in a safe place without online access. The phrase is a master key from your wallet. It was generated on your device and you are the only person who has access to it.</T></p>
            <div className="Mnemonics_list">
                { result ? generateList(result) : <T>Generation ...</T> }
            </div>
            </div>
        )
    }
}

export default stepWrapper(define.steps.generateMnemonics)(MnemonicsGenerator);


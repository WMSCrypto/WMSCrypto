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
            <div className="Mnemonics_list">{ result ? generateList(result) : <T>Generation ...</T> }</div>
        )
    }
}

export default stepWrapper(define.steps.generateMnemonics)(MnemonicsGenerator);


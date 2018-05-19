import React, { Component } from 'react';
import define from "../../core/define";
import { generateMnemonics } from '../../core/crypto';
import stepWrapper from '../../core/stepWrapper';
import T from "../T";

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
            <p>{ result || <T>Generation ...</T> }</p>
        )
    }
}

export default stepWrapper(define.steps.generateMnemonics)(MnemonicsGenerator);


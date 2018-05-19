import React from 'react';
import stepWrapper from "../../../core/stepWrapper";
import define from "../../../core/define";
import { getRandomMnemonicIndex } from "../../../utils";
import T from "../../T";

class MnemonicCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonic: props.result || '',
            index: getRandomMnemonicIndex()
        };
        this._onChange = this._onChange.bind(this);
    }

    _onChange(e) {
        const { value } = e.target;
        const { setResult, getStepResult } = this.props;
        const validMnemonics = getStepResult(define.steps.generateMnemonics).split(' ');
        this.setState({mnemonic: value}, () => {
            setResult(validMnemonics[this.state.index] === value ? value : null);
        })
    }

    render() {
        const { index, mnemonic } = this.state;
        const { result } = this.props;
        return (
            <React.Fragment>
                <p>
                    <T>Please enter mnemonic from previous screen by number</T>
                    <span> </span>
                    <span className="badge  badge-pill badge-primary">{index + 1}</span>
                    {result ? <span> <T>Correct</T></span>: null}
                </p>
                <div style={{marginBottom: 24}}>
                    <input className="form-control" value={mnemonic} onChange={this._onChange}/>
                </div>
            </React.Fragment>
        )
    }
}

export default stepWrapper(define.steps.askMnemonic)(MnemonicCheck);
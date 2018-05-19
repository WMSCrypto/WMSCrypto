import React from 'react';
import stepWrapper from "../../../core/stepWrapper";
import define from "../../../core/define";
import { getRandomMnemonicIndex } from "../../../utils";
import T from "../../T";

const _renderAsk = (index) => {
    return (
        <p>
            <T>Please enter mnemonic from previous screen by number</T>
            <span> </span>
            <span className="badge  badge-pill badge-primary">{index + 1}</span>
        </p>

    )
};

const _renderSuccess = () => <p><T>Check passed</T></p>;

class MnemonicCheck extends React.Component {

    constructor(props) {
        super(props);
        const { getStepResult } = props;
        const index = getRandomMnemonicIndex();
        this.state = {
            mnemonic: props.result || '',
            index,
            validMnemonic: getStepResult(define.steps.generateMnemonics).split(' ')[index]
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        if (define.debug) {
            this._onChange({target: { value: this.state.validMnemonic }})
        }
    }

    _onChange(e) {
        const { value } = e.target;
        const { setResult } = this.props;
        this.setState({mnemonic: value}, () => {
            setResult(this.state.validMnemonic === value ? value : null);
        })
    }

    render() {
        const { index, mnemonic } = this.state;
        const { result } = this.props;
        return (
            <React.Fragment>
                { result ? _renderSuccess() : _renderAsk(index)}
                <div style={{marginBottom: 24}}>
                    <input className="form-control" value={mnemonic} onChange={this._onChange} disabled={!!result}/>
                </div>
            </React.Fragment>
        )
    }
}

export default stepWrapper(define.steps.askMnemonic)(MnemonicCheck);
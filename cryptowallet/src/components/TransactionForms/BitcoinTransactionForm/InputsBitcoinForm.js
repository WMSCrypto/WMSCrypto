import React from 'react';
import InputBlock from "./InputBlock";
import { t } from '../../../utils/translate';


const DEFAULT_INPUT = {
    prevout_n: '',
    prevout_hash: '',
    account: 0,
    address: 0,
    change: 0,
    value: 0,
};


const calcValidation = (arr) => {
    return Object.values(arr).reduce((i,p) => i && p, true)
};

class InputsBitcoinForm extends React.Component {

    constructor(props) {
        super(props);
        const { inputs } = this.props;
        this.state = {
            inputs,
            inputsKeys: [...Array(inputs.length).keys()],
            validInputs: {}
        }
    }

    componentWillMount() {
        if (!this.props.block) {
            this.props.onUpdate(this.state.inputs, false)
        }
    }

    addInput(props) {
        const { inputs, inputsKeys, validInputs } = this.state;
        inputsKeys.push(inputsKeys.length ? (inputsKeys[inputsKeys.length-1] + 1) : 0);
        const newKey = inputsKeys.slice(-1)[0];
        validInputs[newKey] = false;
        inputs.push(props || {...DEFAULT_INPUT});
        this.setState({inputs, inputsKeys, validInputs}, this.props.onUpdate(inputs, false))
    }

    deleteInput(index) {
        const { inputs, inputsKeys, validInputs } = this.state;
        inputs.splice(index, 1);
        const key = inputsKeys.splice(index, 1);
        delete validInputs[key];
        this.setState({ inputs, inputsKeys, validInputs }, this.props.onUpdate(inputs, calcValidation(validInputs)))
    }

    updateInput(index, data, valid) {
        const { inputs, validInputs, inputsKeys } = this.state;
        inputs[index] = data;
        const key = inputsKeys[index];
        validInputs[key] = valid;
        this.setState({ inputs, validInputs }, this.props.onUpdate(inputs, calcValidation(validInputs)))
    }

    render() {
        const { inputs, inputsKeys } = this.state;
        const block = !!this.props.block;
        const amount = inputs ? inputs.reduce((p, i) => p + (i.value || 0), 0) : 0;
        return(
            <React.Fragment>
                {inputs.map((e, i) =>
                    <InputBlock input={e}
                                index={i}
                                block={block}
                                onDelete={() => this.deleteInput(i)}
                                onSave={(i, d, v) => this.updateInput(i, d, v)}
                                key={`inputBitcoin-${inputsKeys[i]}`}/>
                )}
                <div className="BitcoinInputsFooter">
                    <div>
                    {!this.props.external
                        ? <button className="btn btn-outline-primary" onClick={() => this.addInput()}
                            disabled={block}>Add input
                          </button>
                        : null}
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <span>{t('Total amount')}: <strong>{(amount * Math.pow(10, -8)).toFixed(8)} BTC</strong></span>
                    </div>
                </div>
                <br/>
            </React.Fragment>
        )
    }
}

InputsBitcoinForm.defaultProps = {
    inputs: [{...DEFAULT_INPUT}],
    block: false
};

export default InputsBitcoinForm;
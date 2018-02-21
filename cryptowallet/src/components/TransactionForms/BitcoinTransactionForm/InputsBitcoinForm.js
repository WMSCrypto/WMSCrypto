import React from 'react';
import InputBlock from "./InputBlock";

const DEFAULT_INPUT = {
    prevout_n: '',
    prevout_hash: '',
    account: 0,
    address: 0,
    change: 0,
    value: 0,
};

class InputsBitcoinForm extends React.Component {

    constructor(props) {
        super(props);
        const { inputs } = this.props;
        this.state = {
            inputs,
            inputsKeys: [...Array(inputs.length).keys()],
        }
    }

    componentWillMount() {
        if (!this.props.block) {
            this.props.onUpdate(this.state.inputs)
        }
    }

    addInput(props) {
        const { inputs, inputsKeys } = this.state;
        inputsKeys.push(inputsKeys.length ? (inputsKeys[inputsKeys.length-1] + 1) : 0);
        inputs.push(props || {...DEFAULT_INPUT});
        this.setState({inputs, inputsKeys}, this.props.onUpdate(inputs))
    }

    deleteInput(index) {
        const { inputs, inputsKeys } = this.state;
        inputs.splice(index, 1);
        inputsKeys.splice(index, 1);
        this.setState({ inputs, inputsKeys }, this.props.onUpdate(inputs))
    }

    updateInput(index, data) {
        const { inputs } = this.state;
        inputs[index] = data;
        this.setState({ inputs }, this.props.onUpdate(inputs))
    }

    render() {
        const { inputs, inputsKeys } = this.state;
        const block = !!this.props.block;
        return(
            <React.Fragment>
                {inputs.map((e, i) =>
                    <InputBlock input={e}
                                index={i}
                                block={block}
                                onDelete={() => this.deleteInput(i)}
                                onSave={(i, d) => this.updateInput(i, d)}
                                key={`inputBitcoin-${inputsKeys[i]}`}/>
                )}
                <div>
                    {!this.props.external
                        ? <button className="btn btn-primary" onClick={() => this.addInput()}
                            disabled={block}>Add input
                          </button>
                        : null}
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
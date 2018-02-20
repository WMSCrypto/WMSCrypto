import React from 'react';
import InputBlock from "./InputBlock";

class InputsBitcoinForm extends React.Component {

    constructor(props) {
        super(props);
        const { inputs } = this.props;
        this.state = {
            inputs,
            inputsKeys: [...Array(inputs.length).keys()],
        }
    }

    addInput(props) {
        const { inputs, inputsKeys } = this.state;
        inputsKeys.push(inputsKeys.length ? (inputsKeys[inputsKeys.length-1] + 1) : 0);
        inputs.push(props || {});
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
        return(
            <React.Fragment>
                {inputs.map((e, i) =>
                    <InputBlock {...e}
                                index={i}
                                onDelete={() => this.deleteInput(i)}
                                onSave={(i, d) => this.updateInput(i, d)}
                                key={`inputBitcoin-${inputsKeys[i]}`}/>
                )}
                <div>
                    <button className="btn btn-primary"
                            onClick={() => this.addInput()}>
                        Add input
                    </button>
                </div>
                <br/>
            </React.Fragment>
        )
    }
}

InputsBitcoinForm.defaultProps = {
    inputs: [],
};

export default InputsBitcoinForm;
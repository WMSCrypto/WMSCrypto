import React from 'react';
import InputBlock from "./InputBlock";

class BitcoinTransactionForm extends React.Component {

    constructor(props) {
        super(props);
        const { inputs, output_info, outputs, locktime, version } = this.props;
        this.state = {
            txData: { inputs, output_info, outputs, locktime, version },
            inputsKeys: [...Array(inputs.length).keys()],
        }
    }

    addInput(props) {
        const { inputs } = this.state.txData;
        const { inputsKeys } = this.state;
        inputsKeys.push(inputsKeys.length ? (inputsKeys[inputsKeys.length-1] + 1) : 0);
        inputs.push(props || {});
        this.setState({inputs, inputsKeys})
    }

    deleteInput(index) {
        const { inputs } = this.state.txData;
        const { inputsKeys } = this.state;
        inputs.splice(index, 1);
        inputsKeys.splice(index, 1);
        this.setState({ inputs, inputsKeys })
    }

    updateInput(index, data) {
        const { inputs } = this.state.txData;
        inputs[index] = data;
        this.setState({ inputs })
    }

    render() {
        if (parseInt(this.props.coin, 10) !== 0) {
            return null
        }
        const { inputs } = this.state.txData;
        const { inputsKeys } = this.state;
        return(
            <React.Fragment>
                {inputs.map((e, i) =>
                    <InputBlock {...e}
                                index={i}
                                onDelete={inputs.length === 1 ? null : () => this.deleteInput(i)}
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

BitcoinTransactionForm.defaultProps = {
    inputs: [{}],
    output_info: {},
    outputs: [[]],
    locktime: `0x00000000`,
    version: 1
};

export default BitcoinTransactionForm;
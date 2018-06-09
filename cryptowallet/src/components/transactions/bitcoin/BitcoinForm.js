import React from 'react';
import BitcoinInput from "./BitcoinInput";
import T from "../../T";

const getDefaultInput = () => {
    return {
        prevout_n: '',
        prevout_hash: '',
        account: 0,
        change: 0,
        address: 0,
        value: 0
    }
};

const getDefaultForm = () => {
    return {
        coin: 0,
        inputs: [getDefaultInput()],
        receiver: {address: '', value: 0},
        locktime: 0,
        useRBF: false
    }
};

class BitcoinForm extends React.Component {

    constructor(props) {
        super(props);
        this.addInput = this.addInput.bind(this);
    }

    componentWillMount() {
        this.props.fillForm(getDefaultForm())
    }

    addInput() {
        const { data } = this.props;
        data.inputs.push(getDefaultInput());
        this.props.fillForm(data)
    }

    deleteInput(index) {

    }

    addChange() {

    }

    deleteChange() {

    }

    render() {
        const { data, fill } = this.props;
        if (!fill) {
            return null
        } else {
            return (
                <div className="BitcoinFormContainer">
                    {data.inputs.map((e, i) => <BitcoinInput key={`inputs:#{i}`} n={i}/>)}
                    <div>
                        <button className="btn btn-primary btn-sm" onClick={this.addInput}>
                            <T>Add input</T>
                        </button>
                    </div>
                </div>

            )
        }
    }
}

export default BitcoinForm;
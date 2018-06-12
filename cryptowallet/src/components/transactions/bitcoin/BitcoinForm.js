import React from 'react';
import BitcoinInput from "./BitcoinInput";
import BitcoinOutput from "./BitcoinOutput";
import T from "../../T";
import '../styles/BitconForm.css';
import BitcoinChange from "./BitcoinChange";
import BitcoinOther from "./BitcoinOther";

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
        this.addChange = this.addChange.bind(this);
        this.deleteChange = this.deleteChange.bind(this);
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
        this.props.deleteFormGroup({groupName: 'inputs', index})
    }

    addChange() {
        const { data } = this.props;
        this.props.fillForm({
            ...data,
            change: {
                value: 0,
                account: 0,
                address: 0
            }
        })
    }

    deleteChange() {
        this.props.deleteFormGroup({groupName: 'change'})
    }

    renderInputs({ inputs })  {
        let viewIndex = -1;
        return inputs.map((e, i) => {
            if (e !== null) {
                viewIndex++;
                return (
                    <BitcoinInput key={`inputs:#${i}`} n={i} viewN={viewIndex}
                                  onDelete={() => this.deleteInput(i)}/>
                )
            } else {
                return e
            }
        })
    }

    renderChange() {
        if (!this.props.data.change) {
            return (
                <div className="BitcoinAddBtn">
                    <button className="btn btn-primary btn-sm" onClick={this.addChange}>
                        <T>Add change</T>
                    </button>
                </div>
            )
        } else {
            return <BitcoinChange onDelete={this.deleteChange}/>
        }
    }

    render() {
        const { data, fill } = this.props;
        if (!fill) {
            return null
        } else {
            return (
                <div className="BitcoinFormContainer">
                    {this.renderInputs(data)}
                    <div className="BitcoinAddBtn">
                        <button className="btn btn-primary btn-sm" onClick={this.addInput}>
                            <T>Add input</T>
                        </button>
                    </div>
                    <BitcoinOutput/>
                    {this.renderChange()}
                    <BitcoinOther/>
                </div>

            )
        }
    }
}

export default BitcoinForm;
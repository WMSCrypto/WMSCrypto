import React from 'react';
import BitcoinInput from "./BitcoinInput";

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

    componentWillMount() {
        this.props.fillForm(getDefaultForm())
    }

    render() {
        const { data, fill } = this.props;
        if (!fill) {
            return null
        } else {
            return (
                <div className="BitcoinFormContainer">
                    {data.inputs.map((e, i) => <BitcoinInput key={`inputs:#{i}`} n={i}/>)}
                </div>
            )
        }
    }
}

export default BitcoinForm;
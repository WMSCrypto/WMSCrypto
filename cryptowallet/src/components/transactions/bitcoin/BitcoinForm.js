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
        inputs: [
            getDefaultInput()
        ],
        receiver: {
            address: '',
            value: 0
        },
        locktime: 0,
        useRBF: false
    }
};

class BitcoinForm extends React.Component {

    componentWillMount() {
        this.props.fillForm(getDefaultForm())
    }

    render() {
        const { flatData, rawData, fill } = this.props;
        if (!fill) {
            return null
        }
        console.log(flatData)
        return (
            <div className="BitcoinFormContainer">
                {rawData.inputs.map((e, i) => <BitcoinInput key={`#{i}:inputs`}
                                                            n={i}
                                                            flatData={flatData}/>)

                }
            </div>
        )
    }
}

export default BitcoinForm;
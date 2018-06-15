import React from 'react';
import '../styles/BitconForm.css';

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

class EthereumForm extends React.Component {

    constructor(props) {
        super(props);
        this.addInput = this.addInput.bind(this);
        this.addChange = this.addChange.bind(this);
        this.deleteChange = this.deleteChange.bind(this);
    }

    componentWillMount() {
        if (!this.props.fill) {
            this.props.fillForm(getDefaultForm())
        }
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
                value: '',
                account: '',
                address: ''
            }
        })
    }

    deleteChange() {
        this.props.deleteFormGroup({groupName: 'change'})
    }

    render() {
        const { data, fill } = this.props;
        if (!fill) {
            return null
        } else {
            return (
                <div className="EthereumFormContainer">
                    {null}
                </div>

            )
        }
    }
}

export default EthereumForm;
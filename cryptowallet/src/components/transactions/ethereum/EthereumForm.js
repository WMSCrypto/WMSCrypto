import React from 'react';
import '../styles/BitconForm.css';
import TransactionFormTextInput from "../TransactionFormTextInput";
import TransactionFormSelectInput from "../TransactionFormSelectInput";
import TransactionFormTextAreaInput from "../TransactionFormTextAreaInput";

const getDefaultForm = () => {
    return {
        nonce: 0,
        gasPrice: 0,
        gasLimit: 0,
        account: 0,
        change: 0,
        address: 0,
        value: 0,
        coin: 60,
        to: '',
        data: ''
    }
};

class EthereumForm extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.fill) {
            this.props.fillForm(getDefaultForm())
        }
    }

    render() {
        if (!this.props.fill) {
            return null
        } else {
            return (
                <div className="EthereumFormContainer">
                    <div className="row">
                        <div className="col-sm-4">
                            <TransactionFormTextInput field='account'/>
                        </div>
                        <div className="col-sm-4">
                            <TransactionFormSelectInput field='change'
                                                        items={[0, 1]}
                                                        prefix={`inputs-change`}/>
                        </div>
                        <div className="col-sm-4">
                            <TransactionFormTextInput field='address'/>
                        </div>
                    </div>
                    <TransactionFormTextInput field='nonce'/>
                    <TransactionFormTextInput field='gasPrice'/>
                    <TransactionFormTextInput field='gasLimit'/>
                    <TransactionFormTextInput field='to'/>
                    <TransactionFormTextInput field='value'/>
                    <TransactionFormTextAreaInput field='data'/>
                </div>

            )
        }
    }
}

export default EthereumForm;
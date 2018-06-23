import React from 'react'
import StepCounter from "../components/steps/StepCounter";
import ChoiceTransactionSource from '../components/transactions/ChoiceTransactionSource';
import define from "../core/define";
import TransactionForm from "../components/transactions/TransactionForm";
import WalletImageReader from "../components/WalletImage/WalletImageReader";
import TransactionSigner from "../components/transactions/TransactionSigner";


class CreateTransaction extends React.Component {

    render() {
        const { uuid } = this.props.common;
        return (
            <StepCounter>
                <ChoiceTransactionSource first={!uuid} next={define.steps.checkTransaction}/>
                <TransactionForm first={!!uuid} next={define.steps.unlockKey}/>
                <WalletImageReader next={define.steps.signTransaction}/>
                <TransactionSigner controls={false} last={true}/>
            </StepCounter>

        )
    }
}

export default CreateTransaction;
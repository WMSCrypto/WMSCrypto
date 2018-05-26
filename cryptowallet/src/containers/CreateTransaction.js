import React from 'react'
import StepCounter from "../components/steps/StepCounter";
import ChoiceTransactionSource from '../components/transactions/ChoiceTransactionSource';
import define from "../core/define";
import TransactionForm from "../components/transactions/TransactionForm";


class CreateTransaction extends React.Component {

    render() {
        const { uuid } = this.props.common;
        return (
            <StepCounter>
                <ChoiceTransactionSource first={!uuid} next={define.steps.checkTransaction}/>
                <TransactionForm first={!!uuid} next={null}/>
            </StepCounter>

        )
    }
}

export default CreateTransaction;
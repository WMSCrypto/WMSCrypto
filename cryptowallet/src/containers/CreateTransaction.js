import React from 'react'
import StepCounter from "../components/steps/StepCounter";
import ChoiceTransactionSource from '../components/transactions/ChoiceTransactionSource';


class CreateTransaction extends React.Component {

    render() {
        const { uuid } = this.props.common;
        return (
            <StepCounter>
                <ChoiceTransactionSource first={!uuid} next={null}/>
            </StepCounter>

        )
    }
}

export default CreateTransaction;
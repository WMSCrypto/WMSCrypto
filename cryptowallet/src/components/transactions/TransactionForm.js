import React from 'react'
import { connect } from 'react-redux';
import stepWrapper from "../../core/stepWrapper";
import define from "../../core/define";
import {fillForm} from "../../core/actions/transactionFormActions";
import dataToSequence from "./dataToSequence";

const mapStateToProps = (state) => {
    return {
        trx: state.trx
    }
};

const mapPropsToDispatch = dispatch => {
    return {
        fillForm: (data) => {
            dispatch(fillForm(data))
        },
    }
};

class TransactionForm extends React.Component {

    componentWillMount() {
        const { online } = this.props;
        if (online) {
            this.props.fillForm(this.props.common.data)
        } else {
            const result = this.props.getStepResult(define.steps.choiceTransactionSource);
            if (result.method === define.methods.f) {
                this.props.fillForm(result.data)
            } else {}
        }
    }

    render() {
        const { trx } = this.props;
        if (trx.fill) {
            console.log(dataToSequence(trx))
        }
        return (
            <React.Fragment>
                <p>Form</p>
            </React.Fragment>
        )

    }
}

export default stepWrapper(define.steps.checkTransaction)(connect(
    mapStateToProps, mapPropsToDispatch
)(TransactionForm));
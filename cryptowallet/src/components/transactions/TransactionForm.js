import React from 'react'
import { connect } from 'react-redux';
import stepWrapper from "../../core/stepWrapper";
import define from "../../core/define";
import { fillForm } from "../../core/actions/transactionFormActions";
import ManualTransactionForm from "./ManualTransactionForm";
import FilledTransactionForm from "./FilledTransactionForm";

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
        const { online, getStepResult } = this.props;
        if (online) {
            this.props.fillForm(this.props.common.data)
        } else {
            const result = getStepResult(define.steps.choiceTransactionSource);
            if (result.method === define.methods.f) {
                this.props.fillForm(result.data)
            } else {

            }
        }
    }

    render() {
        const { getStepResult, trx, online } = this.props;
        const result = getStepResult(define.steps.choiceTransactionSource);
        if (trx.fill && (online || result)) {
            return (
                <React.Fragment>
                    {online || result.method === define.methods.f
                        ? <FilledTransactionForm {...this.props}/>
                        : <ManualTransactionForm {...this.props}/>
                    }
                </React.Fragment>
            )
        } else {
            return null
        }
    }
}

export default stepWrapper(define.steps.checkTransaction)(connect(
    mapStateToProps, mapPropsToDispatch
)(TransactionForm));
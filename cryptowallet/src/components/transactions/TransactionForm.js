import React from 'react'
import { connect } from 'react-redux';
import stepWrapper from "../../core/stepWrapper";
import define from "../../core/define";
import { fillForm } from "../../core/actions/transactionFormActions";
import ManualTransactionForm from "./ManualTransactionForm";
import FilledTransactionForm from "./FilledTransactionForm";
import TransactionSummary from "./TransactionSummary";
import T from "../T";
import './styles/TransactionForm.css';

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

const renderError = (valid, all) => {
    if (valid && !all.length) {
        return null
    }

    return (
        <div className="alert alert-danger">
            <strong className="text-danger">
                {!valid ? <T dot={true}>Present invalid fields</T> : null}
                {all.map((e, i) => <T key={`all-error-${i}`} dot={true}>{e}</T>)}
                <T dot={true}>You can create transaction in manual mode</T>
            </strong>
        </div>
    )
};

class TransactionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullView: !props.online
        }
    }

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
        const { fullView } = this.state;
        const { valid, errors } = trx;
        const result = getStepResult(define.steps.choiceTransactionSource);
        if (trx.fill && (online || result)) {
            return (
                <React.Fragment>
                    {renderError(valid, errors.ALL)}
                    <div className="TransactionViewControl">
                        <div className={fullView ? '' : 'active'}
                             onClick={() => this.setState({fullView: false})}>
                            <T>Summary</T>
                        </div>
                        <div className={fullView ? 'active' : ''}
                             onClick={() => this.setState({fullView: true})}>
                            <T>Detail</T>
                        </div>
                    </div>
                    <div style={{display: !fullView ? 'block' : 'none'}}>
                        <TransactionSummary {...this.props}/>
                    </div>
                    <div style={{display: fullView ? 'block' : 'none'}}>
                        {online || result.method === define.methods.f
                            ? <FilledTransactionForm {...this.props}/>
                            : <ManualTransactionForm {...this.props}/>
                        }
                    </div>
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
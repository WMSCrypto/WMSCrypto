import React from 'react'
import stepWrapper from "../../core/stepWrapper";
import define from "../../core/define";
import JSONUploader from "../JSONUploader";
import T from "../T";
import CoinsList from "../CoinsList";
import './styles/ChoiceTransactionSource.css';

class ChoiceTransactionSource extends React.Component {

    constructor(props) {
        super(props);
        const { result={} } = props;
        this.state = {
            method: result ? result.method : 'file'
        };

    }

    _changeMethod(e, name) {
        if (e.target.value === 'on') {
            this.setState({method: name})
        }
    }

    render() {
        const { result } = this.props;
        const { method } = this.state;
        return (
            <React.Fragment>
                <div className="TransactionSourceItem">
                    <input id="sourceFile" type="radio" checked={method === 'file'} onChange={(e) => this._changeMethod(e, 'file')}/>
                    <label htmlFor="sourceFile"><T>Create from file</T></label>
                    <JSONUploader disabled={method === 'manual'}
                                  onValid={(data) => {
                                      this.setState({
                                      transaction: data,
                                      isFile: true,
                                      transactionSaved: true,
                                      coin: data.coin
                                      })
                                  }}/>
                </div>
                <div className="TransactionSourceItem">
                    <input id="sourceManual" type="radio" checked={method === 'manual'} onChange={(e) => this._changeMethod(e, 'manual')}/>
                    <label htmlFor="sourceManual"><T>Manual creation</T></label>
                    <CoinsList disabled={method === 'file'}/>
                </div>
            </React.Fragment>
        )

    }
}

export default stepWrapper(define.steps.choiceTransactionSource)(ChoiceTransactionSource);
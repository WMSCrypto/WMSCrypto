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
        const results = {};
        results[define.methods.f] = (result && result.method === define.methods.f)
            ? result.data
            : null;
        results[define.methods.c] = (result && result.method === define.methods.c)
            ? result.data
            : 0;
        this.state = {
            method: result ? result.method : define.methods.f,
            results
        };

    }

    _setResult(data, name) {
        const { setResult } = this.props;
        const { results } = this.state;
        if (data) {
            results[name] = data;
        } else {
            data = results[name];
        }
        this.setState({results}, () => {
            const res = data !== null ? {method: name, data} : null;
            setResult(res)
        })
    }

    _changeMethod(e, name) {
        if (e.target.value === 'on') {
            this.setState({method: name}, () => {
                this._setResult(null, name)
            })
        }
    }

    render() {
        const { method, results } = this.state;
        return (
            <React.Fragment>
                <div className="TransactionSourceItem">
                    <input id="sourceFile"
                           type="radio"
                           checked={method === define.methods.f}
                           onChange={(e) => this._changeMethod(e, define.methods.f)}/>
                    <label htmlFor="sourceFile"><T>Create from file</T></label>
                    <JSONUploader disabled={method === define.methods.c}
                                  onValid={(data) => {this._setResult(data, define.methods.f)}}/>
                </div>
                <div className="TransactionSourceItem">
                    <input id="sourceManual"
                           type="radio"
                           checked={method === define.methods.c}
                           onChange={(e) => this._changeMethod(e, define.methods.c)}/>
                    <label htmlFor="sourceManual"><T>Manual creation</T></label>
                    <CoinsList disabled={method === 'file'}
                               onChange={({ coin }) => {this._setResult(coin, define.methods.c)}}
                               value={results[define.methods.c]}/>
                </div>
            </React.Fragment>
        )

    }
}

export default stepWrapper(define.steps.choiceTransactionSource)(ChoiceTransactionSource);
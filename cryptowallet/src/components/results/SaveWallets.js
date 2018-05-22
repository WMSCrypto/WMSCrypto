import React from 'react';
import stepWrapper from "../../core/stepWrapper";
import define from "../../core/define";
import T from "../T";
import { messages } from "../../assets";
import PreviousButton from "../buttons/PreviousButton";

class SaveWallets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            check: false
        };
        this._onSave = this._onSave.bind(this);
        console.log(props)
    }

    _onSave() {
        const { setResult, uuid, steps, saveOperationResult } = this.props;
        const accounts = steps.components[define.steps.generateXpub.name].result;
        setResult(true);
        saveOperationResult(
            uuid,
            {accounts: accounts.map(e => [
                    e.coin.id,
                    e.node.neutered().toBase58()
                ])}
        )
    }

    render() {
        const { previousStep } = this.props;
        const { check } = this.state;
        return (
            <React.Fragment>
                <div>
                    <h3 className="text-danger"><T>IMPORTANT!</T></h3>
                    <p className="text-muted"><T>{messages.SAVE_WALLETS}</T></p>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={check}
                           onChange={() => this.setState({check: !check})}/>
                    <label className="form-check-label" htmlFor="checkImportant"><small><T>I understand</T></small></label>
                </div>
                <br/>
                <div className="Step_controls">
                    <PreviousButton onClick={() => previousStep()}/>
                    <button type="button"
                            className="btn btn-danger"
                            onClick={this._onSave}
                            disabled={!check}>
                        <T>Create wallet</T>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default stepWrapper(define.steps.saveWallets)(SaveWallets);


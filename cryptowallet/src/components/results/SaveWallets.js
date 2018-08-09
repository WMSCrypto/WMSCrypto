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
            checkPNP: false,
            checkQr: false,
            checkPhrase: false,
            checkAccess: false,
            checkLost: false,
        };
        this._onSave = this._onSave.bind(this);
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
        const { checkQr, checkPhrase, checkAccess, checkLost, checkPNP } = this.state;
        const check = checkQr && checkPhrase && checkAccess && checkLost;
        return (
            <React.Fragment>
                <div>
                    <h3 className="text-danger"><T>IMPORTANT!</T></h3>
                    <p className="text-muted"><T>One day cryptoassets inside your wallet may cost a fortune, so we ask you to confirm that you agree with the following statements:</T></p>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={checkQr}
                           onChange={() => this.setState({checkQr: !checkQr})}
                           id="saveWalletCheckQr"/>
                    <label className="form-check-label" htmlFor="saveWalletCheckQr"><small><T>I saved the QR Key</T></small></label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={checkPhrase}
                           onChange={() => this.setState({checkPhrase: !checkPhrase})}
                           id="saveWalletCheckPhrase"/>
                    <label className="form-check-label" htmlFor="saveWalletCheckPhrase"><small><T>I wrote down the recovery phrase</T></small></label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={checkAccess}
                           onChange={() => this.setState({checkAccess: !checkAccess})}
                           id="saveWalletCheckAccess"/>
                    <label className="form-check-label" htmlFor="saveWalletCheckAccess"><small><T>I understand that loss of the recovery phrase is equivalent to the loss of access to the wallet</T></small></label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={checkLost}
                           onChange={() => this.setState({checkLost: !checkLost})}
                           id="saveWalletCheckLost"/>
                    <label className="form-check-label" htmlFor="saveWalletCheckLost"><small><T>I understand that it is unsafe to keep the recovery phrase on devices with Internet access since the recovery phrase is the master key from my wallet</T></small></label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={checkPNP}
                           onChange={() => this.setState({checkPNP: !checkPNP})}
                           id="saveWalletCheckPNP"/>
                    <label className="form-check-label" htmlFor="saveWalletCheckPNP"><small><T>P == NP (optional)</T></small></label>
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


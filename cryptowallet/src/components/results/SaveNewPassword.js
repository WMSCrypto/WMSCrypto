import React from 'react';
import stepWrapper from "../../core/stepWrapper";
import define from "../../core/define";
import T from "../T";
import { messages } from "../../assets";
import PreviousButton from "../buttons/PreviousButton";

class SaveNewPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            check: false,
        };
        this._onSave = this._onSave.bind(this);
    }

    _onSave() {
        const { setResult, uuid, saveOperationResult, common } = this.props;
        setResult(true);
        saveOperationResult(uuid, common.data)
    }

    render() {
        const { previousStep } = this.props;
        const { check } = this.state;
        return (
            <React.Fragment>
                <div>
                    <h3 className="text-danger"><T>IMPORTANT!</T></h3>
                    <p className="text-muted"><T>This action save new server password and old key set invalid.</T></p>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           checked={check}
                           onChange={() => this.setState({check: !check})}/>
                    <label className="form-check-label" htmlFor="checkImportant"><small><T>I saved the QR Key</T></small></label>
                </div>
                <br/>
                <div className="Step_controls">
                    <PreviousButton onClick={() => previousStep()}/>
                    <button type="button"
                            className="btn btn-danger"
                            onClick={this._onSave}
                            disabled={!check}>
                        <T>Save new password</T>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default stepWrapper(define.steps.saveNewPassword)(SaveNewPassword);


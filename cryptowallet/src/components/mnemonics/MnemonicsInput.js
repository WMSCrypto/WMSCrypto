import React, { Component } from 'react';
import bip39 from 'bip39';
import VisibilityIcon from "../VisibilityIcon";
import T from "../T";
import stepWrapper from "../../core/stepWrapper";
import define from "../../core/define";


class MnemonicsInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonics: '',
            salt: '',
            validMnemonics: false,
            visible: false
        };
        this._changeMnemonic = this._changeMnemonic.bind(this);
        this._changeSalt = this._changeSalt.bind(this);
        this._toggleVisible = this._toggleVisible.bind(this);
    }

    componentWillMount() {
        if (!this.props.result) {
            this.props.setResult({
                mnemonics: '',
                salt: ''
            })
        }
    }

    _toggleVisible() {
        const { visible } = this.state;
        this.setState({ visible: !visible })
    }

    _changeMnemonic({ target }) {
        const { result, setResult } = this.props;
        const indexDot = target.value.lastIndexOf('\u2022');
        let { mnemonics } = result;
        if (indexDot > -1) {
            mnemonics = mnemonics.slice(0, indexDot + 1) + target.value.slice(indexDot + 1)
        } else {
            mnemonics = target.value
        }
        const validMnemonics = bip39.validateMnemonic(mnemonics);
        this.setState({ validMnemonics }, setResult({
            ...result,
            mnemonics
        }))
    }

    _changeSalt({ target }) {
        const { result, setResult } = this.props;
        setResult({
            ...result,
            salt: target.value
        });
    }

    render() {
        const { result } = this.props;
        if (!result) { return null }

        const { validMnemonics, visible } = this.state;
        return(
            <React.Fragment>
                <div className="form-group">
                    <div className="MnemonicsCardHeader">
                        <label><T>Mnemonics</T></label>
                        <VisibilityIcon size={24} onClick={this._toggleVisible} visible={visible}/>
                    </div>
                    <textarea className="form-control"
                              id="mnemonicsInput"
                              value={visible ? result.mnemonics : Array(result.mnemonics.length).fill('\u2022').join('')}
                              onChange={this._changeMnemonic}
                              rows="4"/>
                    {result.mnemonics && !validMnemonics
                        ? <small className="text-danger"><T>Invalid mnemonics</T></small>
                        : null
                    }
                </div>
                <div className="form-group">
                    <label><T>Passphrase</T></label>
                    <input className="form-control"
                           type="password"
                           value={result.salt}
                           onChange={this._changeSalt}/>
                </div>
            </React.Fragment>
        )
    }
}

MnemonicsInput.propTypes = {};

export default stepWrapper(define.steps.setMnemonics)(MnemonicsInput);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bip39 from 'bip39';
import CreateWallet from "./CreateWallet";
import { NextButton, Card } from '../components/index';
import { t } from '../utils/translate';
import VisibilityIcon from "../components/VisibilityIcon";

class ConnectWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonics: '',
            salt: '',
            seedHex: null,
            validMnemonics: false,
            visible: false
        };
        this._getSeed = this._getSeed.bind(this);
        this._changeMnemonic = this._changeMnemonic.bind(this);
        this._toggleVisible = this._toggleVisible.bind(this);
    }

    _toggleVisible() {
        const { visible } = this.state;
        this.setState({ visible: !visible })
    }

    _changeMnemonic({ target }) {
        const indexDot = target.value.lastIndexOf('\u2022');
        let { mnemonics } = this.state;
        if (indexDot > -1) {
            mnemonics = mnemonics.slice(0, indexDot + 1) + target.value.slice(indexDot + 1)
        } else {
            mnemonics = target.value
        }
        const validMnemonics = bip39.validateMnemonic(mnemonics);
        this.setState({ validMnemonics, mnemonics})
    }

    _getSeed() {
        const { mnemonics, salt } = this.state;
        const seedHex = bip39.mnemonicToSeedHex(mnemonics, salt);
        this.setState({ seedHex })
    }

    render() {
        const { salt, mnemonics, seedHex, validMnemonics, visible } = this.state;
        const { uuid, onOperationResult } = this.props;
        return(
            <React.Fragment>
                <Card>
                    <div className="form-group">
                        <div className="MnemonicsCardHeader">
                            <label>{t("Mnemonics")}</label>
                            <VisibilityIcon size={24} onClick={this._toggleVisible} visible={visible}/>
                        </div>
                        <textarea className="form-control"
                                  id="mnemonicsInput"
                                  value={visible ? mnemonics : Array(mnemonics.length).fill('\u2022').join('')}
                                  onChange={this._changeMnemonic}
                                  rows="4"
                                  disabled={seedHex}/>
                        {mnemonics && !validMnemonics
                            ? <small className="text-danger">{t("Invalid mnemonics")}</small>
                            : null
                        }
                    </div>
                    <div className="form-group">
                        <label>{t("Passphrase")}</label>
                        <input className="form-control"
                               type="password"
                               value={salt}
                               onChange={(e) => this.setState({salt: e.target.value})}
                               disabled={seedHex}/>
                    </div>
                </Card>
                {!seedHex
                    ?   <NextButton disabled={!mnemonics}
                                    title={t("Connect wallet")}
                                    onClick={this._getSeed}/>
                    : null
                }
                {seedHex
                    ? <CreateWallet seed={seedHex}
                                    uuid={uuid}
                                    onOperationResult={onOperationResult}/>
                    : null
                }
            </React.Fragment>
        )
    }
}

ConnectWallet.propTypes = {
    uuid: PropTypes.string,
    onOperationResult: PropTypes.func
};

export default ConnectWallet;

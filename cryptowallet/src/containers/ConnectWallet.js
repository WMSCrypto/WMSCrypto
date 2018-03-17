import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bip39 from 'bip39';
import CreateWallet from "./CreateWallet";
import { NextButton, Card } from '../components/index';
import { t } from '../utils/translate';

class ConnectWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonics: '',
            salt: '',
            seedHex: null
        };
        this._getSeed = this._getSeed.bind(this)
    }
    _getSeed() {
        const { mnemonics, salt } = this.state;
        const seedHex = bip39.mnemonicToSeedHex(mnemonics, salt);
        this.setState({ seedHex })
    }

    render() {
        const { salt, mnemonics, seedHex } = this.state;
        const { uuid, onOperationResult } = this.props;
        return(
            <React.Fragment>
                <Card>
                    <div className="form-group">
                        <label>{t("Mnemonics")}</label>
                        <textarea className="form-control"
                                  id="mnemonicsInput"
                                  value={mnemonics}
                                  onChange={(e) => this.setState({mnemonics: e.target.value})}
                                  rows="4"
                                  disabled={seedHex}/>
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
                    ?   <NextButton title={t("Connect wallet")}
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

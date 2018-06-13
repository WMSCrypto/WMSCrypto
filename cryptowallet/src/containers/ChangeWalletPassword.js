import React, { Component } from 'react';
import { enctryptSeedWithCheckAnchor } from '../utils';
import { NextButton, CreatePassword } from '../components';
import { t } from '../utils/translate';
import WalletImageReader from "../components/WalletImage/WalletImageReader";
import WalletImageGenerator from "../components/WalletImage/WalletImageGenerator";

class ChangeWalletPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: null,
            newEncryptedSeed: null,
            seed: null,
        };
        this._encryptSeed = this._encryptSeed.bind(this);
    }

    _encryptSeed() {
        const { newPassword, seed } = this.state;
        this.setState({
            newEncryptedSeed: enctryptSeedWithCheckAnchor(seed, newPassword)
        })
    }

    render() {
        const { newEncryptedSeed, newPassword, seed } = this.state;
        return (
            <div>
                <p className="text-light">{t("Change wallet password")}</p>
                <WalletImageReader seed={seed} first={true}/>
                {seed && !newEncryptedSeed
                    ? <CreatePassword setPassword={(p) => {this.setState({newPassword: p})}}/>
                    : null}

                {newPassword && !newEncryptedSeed
                    ? <NextButton title={t("Encrypt seed")}
                                  disabled={!!newEncryptedSeed}
                                  onClick={this._encryptSeed}/>
                    : null
                }

                {newEncryptedSeed
                    ? <WalletImageGenerator seed={{hex: seed, encrypted: newEncryptedSeed}}/>
                    : null
                }
            </div>
        )
    }
}

export default ChangeWalletPassword;

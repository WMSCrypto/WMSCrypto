import React, { Component } from 'react';
import Card from "../components/Card";
import PasswordInput from "../components/PasswordInput";
import NextButton from "../components/NextButton";
import aes from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';
import CreatePassword from "../components/CreatePassword";
import LastStep from "../components/LastStep";
import { messages } from '../assets';
import DownloadButton from "../components/DownloadButton";
import Icon from "../components/Icon";

const HIDDEN_MNEMONICS = Array(24*5).fill('\u2022').join('');

const decryptMnemonics = (text, password) => {
    try {
        const bytes = aes.decrypt(text, password);
        return UTF8.stringify(bytes);
    } catch (err) {
        console.log(err);
        return null
    }
};

class ChangeWalletPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encryptedMnemonics: '',
            newEncryptedMnemonics: null,
            mnemonics: null,
            password: '',
            newPassword: null,
            passwordInvalid: false,
            visibleMnemonics: false
        }
    }

    decryptMnemonics() {
        const { password, encryptedMnemonics } = this.state;
        const decrypted = decryptMnemonics(encryptedMnemonics, password);
        if (decrypted) {
            this.setState({mnemonics: decrypted, passwordInvalid: false})
        } else {
            this.setState({passwordInvalid: true})
        }
    }

    generateMnemonics() {
        const { newPassword, mnemonics } = this.state;
        const encryptedMnemonics = aes.encrypt(mnemonics, newPassword);
        this.setState({
            newEncryptedMnemonics: encryptedMnemonics
        })
    }

    render() {
        const {
            encryptedMnemonics, newEncryptedMnemonics,
            mnemonics, password, passwordInvalid, newPassword,
            visibleMnemonics
        } = this.state;
        let showedMnemonics = null;
        if (mnemonics) {
            showedMnemonics = visibleMnemonics ? mnemonics : HIDDEN_MNEMONICS;
        }
        const inputAttrs = mnemonics ? {disabled: true} : {};
        // TODO: перенести из MnemonicInput
        return (
            <div>
                <Card>
                    <div className="form-group">
                        <div className="MnemonicsCardHeader">
                            <label htmlFor="mnemonicsInput">Encrypted mnemonics.</label>
                            {mnemonics
                                ? <Icon size="24px"
                                        icon={visibleMnemonics ?  'visibility off' :'visibility'}
                                        onClick={() => this.setState({visibleMnemonics: !visibleMnemonics})}/>
                                : null
                            }
                        </div>
                        <textarea className="form-control"
                                  id="mnemonicsInput"
                                  value={showedMnemonics || encryptedMnemonics}
                                  onChange={(e) => this.setState({encryptedMnemonics: e.target.value})}
                                  rows="4"
                                  {...inputAttrs}/>
                    </div>
                    <PasswordInput label="Old password"
                                   placeholder="Input your password"
                                   value={password}
                                   invalid={passwordInvalid}
                                   messages={passwordInvalid && ["Invalid password or encrypter mnemonic"]}
                                   onChange={(e) => this.setState({password: e.target.value})}
                                   inputAttrs={inputAttrs}/>
                </Card>
                <br/>
                <NextButton title="Decrypt mnemonics"
                            disabled={!(password && encryptedMnemonics) || mnemonics}
                            onClick={() => this.decryptMnemonics()}/>
                <br/>
                {mnemonics ? <CreatePassword setPassword={(p) => {this.setState({newPassword: p})}}/> : null}
                <br/>
                {newPassword
                    ? <NextButton title="Encrypt mnemonics"
                                  onClick={() => this.generateMnemonics()}/>
                    : null
                }
                <br/>
                {newEncryptedMnemonics
                    ? <Card><DownloadButton title="Download encrypted mnemonics"
                                            id="newEncryptedMnemonics"
                                            obj={{
                                                encryptedMnemonics: newEncryptedMnemonics.toString(),
                                                version: '0.1'
                                            }}/></Card>
                    : null
                }
                <br/>
                {newEncryptedMnemonics
                    ? <LastStep title="Save mnemonics"
                                hide={false}
                                important={true}
                                message={messages.SAVE_WALLETS}
                                onClick={() =>{console.log(newEncryptedMnemonics.toString())}}/>
                    : null
                }
                <br/>
            </div>
        )
    }
}

export default ChangeWalletPassword;
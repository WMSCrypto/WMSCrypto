import React, { Component } from 'react';
import Card from "../components/Card";
import PasswordInput from "../components/PasswordInput";
import NextButton from "../components/NextButton";
import aes from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';

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
            encryptedMnemonics: null,
            mnemonics: null,
            password: null,
            passwordInvalid: false
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

    render() {
        const { encryptedMnemonics, mnemonics, password, passwordInvalid } = this.state;
        const inputAttrs = mnemonics ? {disabled: true} : {};
        return (
            <div>
                <Card>
                    <div className="form-group">
                        <label htmlFor="mnemonicsInput">Encrypted mnemonics.</label>
                        <textarea className="form-control"
                                  id="mnemonicsInput"
                                  value={mnemonics || encryptedMnemonics}
                                  onChange={(e) => this.setState({encryptedMnemonics: e.target.value})}
                                  rows="4"
                                  {...inputAttrs}/>
                    </div>
                    <PasswordInput label="Password"
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
            </div>
        )
    }
}

export default ChangeWalletPassword;
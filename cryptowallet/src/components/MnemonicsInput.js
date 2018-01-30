import React, { Component } from 'react';
import Card from './Card';
import PasswordInput from "./PasswordInput";
import UTF8 from "crypto-js/enc-utf8";
import aes from "crypto-js/aes";
import bip39 from 'bip39';
import Icon from "./Icon";
import NextButton from "./NextButton";

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

class MnemonicsInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encryptedMnemonics: '',
            mnemonics: '',
            password: '',
            visibleMnemonics: !props.encrypted,
            passwordInvalid: false,
            block: props.block || false
        }
    }

    decryptMnemonics() {
        const { password, encryptedMnemonics } = this.state;
        const decrypted = decryptMnemonics(encryptedMnemonics, password);
        if (decrypted) {
            this.setState({
                mnemonics: decrypted, passwordInvalid: false, block: true
            })
        } else {
            this.setState({passwordInvalid: true})
        }
    }

    saltedMnemonics() {
        const { password, mnemonics } = this.state;
        const hex = bip39.mnemonicToSeedHex(mnemonics, password);
        this.props.onValidate({ hex, mnemonics, password });
    }

    onClick() {
        if (this.props.encrypted) {
            this.decryptMnemonics()
        } else {
            this.saltedMnemonics()
        }
    }

    onChangeMnemonics(e) {
        const { encrypted } = this.props;
        const { visibleMnemonics, mnemonics } = this.state;
        if (encrypted) {
            this.setState({encryptedMnemonics: e.target.value})
        } else {
            let newValue = e.target.value;
            if (!visibleMnemonics) {
                newValue = mnemonics + newValue.slice(mnemonics.length);
            }
            this.setState({mnemonics: newValue})
        }
    }

    validatedMnemonics() {
        const { mnemonics } = this.state;
        if (mnemonics && !this.props.encrypted && !bip39.validateMnemonic(mnemonics)) {
            return <small className="text-warning">Mnemonics invalid</small>
        } else {
            return null
        }
    }

    render() {
        const { password, mnemonics, encryptedMnemonics, visibleMnemonics, passwordInvalid } = this.state;
        const { passwordLabel, mnemonicsLabel, buttonLabel, disabled, encrypted  } =  this.props;
        let showedMnemonics = null;
        if (mnemonics) {
            showedMnemonics = visibleMnemonics ? mnemonics : Array(mnemonics.length).fill('\u2022').join('');;
        }
        const inputAttrs = disabled ? {disabled: true} : {};
        return(
            <div>
                <Card>
                    <div className="form-group">
                        <div className="MnemonicsCardHeader">
                            <label htmlFor="mnemonicsInput">{mnemonicsLabel}</label>
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
                                  onChange={(e) => this.onChangeMnemonics(e)}
                                  rows="4"
                                  {...inputAttrs}/>
                        {this.validatedMnemonics()}
                    </div>
                    <PasswordInput label={passwordLabel}
                                   placeholder={`Input your ${passwordLabel}`}
                                   value={password}
                                   invalid={passwordInvalid}
                                   messages={passwordInvalid && ["Invalid password or encrypted mnemonic"]}
                                   onChange={(e) => this.setState({password: e.target.value})}
                                   inputAttrs={inputAttrs}/>
                </Card>
                <br/>
                <NextButton title={buttonLabel}
                            disabled={disabled}
                            onClick={() => this.onClick()}/>

            </div>
        )
    }
}

export default MnemonicsInput;
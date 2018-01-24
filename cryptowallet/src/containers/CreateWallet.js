import React, { Component } from 'react';
import { PasswordInput, NextButton, MnemonicsView } from '../components';
import zxcvbn from 'zxcvbn';
import bip39 from 'bip39';

const MNEMONICS_BITS = 256;

const validatePassword = (password) => {
    const { warning, suggestions } = zxcvbn(password).feedback;
    return [warning, ...suggestions];
};


class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordRepeat: '',
            mnemonics: null
        };
    }

    generateMnemonics() {
        this.setState({
            mnemonics: bip39.generateMnemonic(MNEMONICS_BITS)
        })
    }

    render() {
        const { password, passwordRepeat, mnemonics } = this.state;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        const passwordStepApprove = password && passwordRepeat && password === passwordRepeat;
        return (
            <div>
                <PasswordInput label="Password"
                               placeholder="Enter password"
                               onChange={(e) => this.setState({password: e.target.value})}
                               value={password}
                               messages={validateMessages}
                               valid={passwordStepApprove}
                               id="inputPassword"/>
                <PasswordInput label="Repeat password"
                               placeholder="Repeat password"
                               value={passwordRepeat}
                               onChange={(e) => this.setState({passwordRepeat: e.target.value})}
                               messages={notMatch && ['Passwords not matched']}
                               invalid={notMatch}
                               valid={passwordStepApprove}
                               id="repeatPasswordInput"/>
                <NextButton title="Generate mnemonics"
                            disabled={!passwordStepApprove}
                            onClick={() => this.generateMnemonics()}/>
                <MnemonicsView mnemonics={passwordStepApprove && mnemonics}
                               bits={MNEMONICS_BITS}/>
            </div>
        )

    }
}

export default CreateWallet;
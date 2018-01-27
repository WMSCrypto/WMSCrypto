import React, { Component } from 'react';
import { HDNode } from 'bitcoinjs-lib';
import zxcvbn from 'zxcvbn';
import bip39 from 'bip39';
import aes from 'crypto-js/aes';
import { PasswordInput, NextButton, MnemonicsView, AddressCard, Card } from '../components';
import { coins } from '../assets';

const MNEMONICS_BITS = 256;
const VALID_PASSWORD_MESSAGE = 'Passwords match and have strong security.';

const validatePassword = (password) => {
    const { warning, suggestions } = zxcvbn(password).feedback;
    return [warning, ...suggestions];
};

const getAnchor = () => {
    const { hash } = window.location;
    return hash && hash.slice(1);
};

class CreateWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordRepeat: '',
            mnemonics: null,
            encryptedMnemonics: null,
            addresses: null,
            steps: {
                createPassword: false,
                generateMnemonics: false,
                generateWallets: false,
                encryptMnemonics: false,
            }
        };
    }

    generateAddresses() {
        const seed = bip39.mnemonicToSeed(this.state.mnemonics);
        const node = HDNode.fromSeedBuffer(seed);
        const addresses = Object.keys(coins).map(
            (e) => {
                const accountNode = node.derivePath(`m/44'/${coins[e]}'/0'`);
                return {
                    node: accountNode,
                    coin: e
                }
            });
        this.setState({ addresses })

    }

    generateMnemonics() {
        const mnemonics = bip39.generateMnemonic(MNEMONICS_BITS);
        const { password } = this.state;
        const encryptedMnemonics = aes.encrypt(mnemonics, `${password}${getAnchor()}`);
        this.setState({
            mnemonics,
            encryptedMnemonics
        })
    }

    render() {
        const { password, passwordRepeat, encryptedMnemonics, mnemonics, addresses } = this.state;
        const validateMessages = password && validatePassword(password);
        const notMatch = passwordRepeat && password !== passwordRepeat;
        const passwordStepApprove = password && passwordRepeat && password === passwordRepeat;
        return (
            <div>
                <Card>
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
                                   validMessage={VALID_PASSWORD_MESSAGE}
                                   id="repeatPasswordInput"/>
                </Card>
                <br/>
                <NextButton title="Generate mnemonics"
                            disabled={!passwordStepApprove}
                            onClick={() => this.generateMnemonics()}/>
                <br/>
                <Card hide={!(passwordStepApprove && mnemonics)}>
                    <MnemonicsView mnemonics={passwordStepApprove && mnemonics}
                                   encryptedMnemonics={encryptedMnemonics}
                                   anchor={getAnchor()}
                                   bits={MNEMONICS_BITS}/>
                </Card>
                <br/>
                <NextButton title="Generate wallets"
                            disabled={!mnemonics}
                            onClick={() => this.generateAddresses()}/>
                { addresses && addresses.map(e => <AddressCard key={`address-${e.coin}`} {...e}/>)}
            </div>
        )

    }
}

export default CreateWallet;
import React, { Component } from 'react';
import { HDNode } from 'bitcoinjs-lib';
import zxcvbn from 'zxcvbn';
import bip39 from 'bip39';
import { PasswordInput, NextButton, MnemonicsView, AddressCard } from '../components';
import { coins } from '../assets';

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
            mnemonics: null,
            addresses: null
        };
    }

    generateAddresses() {
        const seed = bip39.mnemonicToSeed(this.state.mnemonics);
        const node = HDNode.fromSeedBuffer(seed);
        const addresses = Object.keys(coins).map(
            (e) => {
                const accountNode = node.derivePath(`m/44'/${coins[e]}'/0'/0/0`);
                return {
                    node: accountNode,
                    path: `m/44'/${coins[e]}'/0'/0/0`,
                    coin: e
                }
            });
        this.setState({ addresses })

    }

    generateMnemonics() {
        this.setState({
            mnemonics: bip39.generateMnemonic(MNEMONICS_BITS)
        })
    }

    render() {
        const { password, passwordRepeat, mnemonics, addresses } = this.state;
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
                <NextButton title="Generate wallets"
                            disabled={!mnemonics}
                            onClick={() => this.generateAddresses()}/>
                <div style={{margin: '16px 0'}}>
                    { addresses && addresses.map(e => <AddressCard key={`address-${e.coin}`} {...e}/>)}
                </div>
            </div>
        )

    }
}

export default CreateWallet;
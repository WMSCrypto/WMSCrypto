import React, { Component } from 'react';
import { HDNode } from 'bitcoinjs-lib';
import zxcvbn from 'zxcvbn';
import bip39 from 'bip39';
import aes from 'crypto-js/aes';
import { PasswordInput, NextButton, MnemonicsView, Account, Card } from '../components';
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

const setProgess = (l1, l2, message, visible=false) => {
    const percents = ((l1 / (l2 - 1)) * 100).toFixed(2);
    const progress = document.getElementById('generateProgress');
    progress.style.setProperty('width', `${percents}%`);
    progress.parentElement.style.setProperty('visibility', visible ? 'visible' : 'hidden');
    const generatedCoin = document.getElementById('generatedCoin');
    generatedCoin.innerText = message;
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

    generateAddresses(index, addresses) {
        const seed = bip39.mnemonicToSeed(this.state.mnemonics);
        const node = HDNode.fromSeedBuffer(seed);
        const e = coins[index];
        if (index < coins.length) {
            setProgess(addresses.length, coins.length, `Generated pubkey for ${e.name}`, true);
            const accountNode = node.derivePath(`m/${e.purpose || '44'}'/${e.id}'/0'`);
            addresses.push({
                node: accountNode,
                coin: e
            });
            setTimeout(() => this.generateAddresses(index + 1, addresses), 100)
        } else {
            setProgess(0, coins.length, 'All pubkeys was generated successful', false);
            this.setState({ addresses })
        }
    }

    generateMnemonics() {
        const mnemonics = bip39.generateMnemonic(MNEMONICS_BITS);
        const { password } = this.state;
        const encryptedMnemonics = aes.encrypt(mnemonics, password);
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
                            onClick={() => this.setState(
                                {addresses: null}, () => {
                                    setProgess(0, coins.length, '');
                                    this.generateMnemonics()
                                })
                            }/>
                <br/>
                <Card hide={!(passwordStepApprove && mnemonics)}>
                    <MnemonicsView mnemonics={passwordStepApprove && mnemonics}
                                   encryptedMnemonics={encryptedMnemonics}
                                   anchor={getAnchor()}
                                   bits={MNEMONICS_BITS}/>
                </Card>
                <br/>
                {mnemonics && <NextButton title="Generate wallets"
                                          disabled={!mnemonics || addresses}
                                          onClick={() => this.generateAddresses(0, [])}/>
                }
                <br/>
                <small id="generatedCoin" className="text-light"/>
                <div className="progress" style={{visibility: 'hidden'}}>
                    <div id="generateProgress" className="progress-bar" style={{width: '0%'}}/>
                </div>
                { addresses && addresses.map(e => <Account key={`address-${e.coin.id}`} {...e}/>)}
                <br/>
            </div>
        )

    }
}

export default CreateWallet;
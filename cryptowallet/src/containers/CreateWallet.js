import React, { Component } from 'react';
import { HDNode } from 'bitcoinjs-lib';
import bip39 from 'bip39';
import aes from 'crypto-js/aes';
import { NextButton, MnemonicsView, Card, LastStep } from '../components';
import CreatePassword from "../components/CreatePassword";
import { coins, messages } from '../assets';

const MNEMONICS_BITS = 256;

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
            password: null,
            mnemonics: null,
            encryptedMnemonics: null,
            addresses: null,
            checkImportant: false
        };
    }

    generateAddresses(index, addresses) {
        const seed = bip39.mnemonicToSeed(this.state.mnemonics);
        const node = HDNode.fromSeedBuffer(seed);
        const e = coins[index];
        if (index < coins.length) {
            setProgess(addresses.length, coins.length, `Generated pubkey for ${e.name}`, true);
            const accountNode = node.derivePath(`m/${e.purpose || '44'}'/${e.id}'/0'`);
            console.log(`Generated pub key for ${e.name}: ${accountNode.neutered().toBase58()}`);
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
        // TODO: блокировать кнопки во время генерации xpub
        const { password, encryptedMnemonics, mnemonics, addresses } = this.state;
        return (
            <div>
                <CreatePassword setPassword={(p) => {this.setState({password: p})}}>
                    <p className="text-muted">{messages.SAVE_MNEMONICS}</p>
                </CreatePassword>
                <br/>
                <NextButton title="Generate mnemonics"
                            disabled={!password}
                            onClick={() => this.setState(
                                {addresses: null}, () => {
                                    setProgess(0, coins.length, '');
                                    this.generateMnemonics()
                                })
                            }/>
                <br/>
                <Card hide={!(password && mnemonics)}>
                    <MnemonicsView mnemonics={password && mnemonics}
                                   encryptedMnemonics={encryptedMnemonics}
                                   bits={MNEMONICS_BITS}/>
                </Card>
                <br/>
                {mnemonics && <NextButton title="Generate pubkeys"
                                          disabled={!mnemonics || addresses}
                                          onClick={() => this.generateAddresses(0, [])}/>
                }
                <br/>
                <small id="generatedCoin" className="text-light"/>
                <div className="progress" style={{visibility: 'hidden'}}>
                    <div id="generateProgress" className="progress-bar" style={{width: '0%'}}/>
                </div>
                {addresses
                    ? <LastStep title="Save mnemonics"
                                hide={false}
                                important={true}
                                message={messages.SAVE_WALLETS}
                                onClick={() =>{console.log(encryptedMnemonics.toString())}}/>
                    : null
                }
                <br/>
            </div>
        )

    }
}

export default CreateWallet;
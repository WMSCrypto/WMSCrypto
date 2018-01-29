import React, { Component } from 'react';
import { HDNode } from "bitcoinjs-lib";
import { coins } from "../assets";
import NextButton from './NextButton';
import bip39 from "bip39";

const setProgess = (l1, l2, message, visible=false) => {
    const percents = ((l1 / (l2 - 1)) * 100).toFixed(2);
    const progress = document.getElementById('generateProgress');
    progress.style.setProperty('width', `${percents}%`);
    progress.parentElement.style.setProperty('visibility', visible ? 'visible' : 'hidden');
    const generatedCoin = document.getElementById('generatedCoin');
    generatedCoin.innerText = message;
};

class AccountsGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: null,
            block: false
        }
    }

    generateAccounts(index, accounts) {
        let node = null;
        const { mnemonics, hex, onGenerate } = this.props;
        if (mnemonics) {
            const seed = bip39.mnemonicToSeed(mnemonics);
            node = HDNode.fromSeedBuffer(seed);
        }

        if (hex) {
            node = HDNode.fromSeedHex(hex)
        }

        const e = coins[index];
        if (index < coins.length) {
            setProgess(accounts.length, coins.length, `Generated pubkey for ${e.name}`, true);
            const accountNode = node.derivePath(`m/${e.purpose || '44'}'/${e.id}'/0'`);
            console.log(`Generated pub key for ${e.name}: ${accountNode.neutered().toBase58()}`);
            accounts.push({
                node: accountNode,
                coin: e
            });
            setTimeout(() => this.generateAccounts(index + 1, accounts), 100)
        } else {
            setProgess(0, coins.length, 'All pubkeys was generated successful', false);
            onGenerate(accounts)
        }
    }

    render() {
        const { disabled } = this.props;
        return(
            <div>
                <NextButton title="Generate pubkeys"
                            disabled={this.state.block || disabled}
                            onClick={() => this.setState({block :true},this.generateAccounts(0, []))}/>
                <br/>
                <small id="generatedCoin" className="text-light"/>
                <div className="progress" style={{visibility: 'hidden'}}>
                    <div id="generateProgress" className="progress-bar" style={{width: '0%'}}/>
                </div>
            </div>
        )
    }
}

export default AccountsGenerator;
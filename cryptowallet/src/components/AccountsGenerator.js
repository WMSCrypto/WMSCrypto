import React, { Component } from 'react';
import { HDNode } from "bitcoinjs-lib";
import { coins } from "../assets";
import bip39 from "bip39";
import { t } from '../utils/translate';
import stepWrapper from "../core/stepWrapper";
import define from "../core/define";
import T from "./T";

const setProgress = (l1, l2, message, visible=false) => {
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
            accounts: props.result
        }
    }

    componentDidMount() {
        if (!this.props.result) {
            this.generateAccounts(0, [])
        }
    }

    generateAccounts(index, accounts) {
        let node = null;
        const { hex, getStepResult } = this.props;
        const mnemonics = getStepResult(define.steps.generateMnemonics);
        if (mnemonics) {
            const seed = bip39.mnemonicToSeed(mnemonics);
            node = HDNode.fromSeedBuffer(seed);
        }

        if (hex) {
            node = HDNode.fromSeedHex(hex)
        }

        const e = coins[index];
        if (index < coins.length) {
            setProgress(accounts.length, coins.length, `${t("Generated pubkey for") } ${e.name}`, true);
            const accountNode = node.derivePath(`m/${e.purpose || '44'}'/${e.id}'/0'`);
            console.log(`Generated pub key for ${e.name}: ${accountNode.neutered().toBase58()}`);
            accounts.push({
                node: accountNode,
                coin: e
            });
            setTimeout(() => this.generateAccounts(index + 1, accounts), 100)
        } else {
            setProgress(accounts.length, coins.length, '', true);
            this.props.setResult(accounts);
        }
    }

    render() {
        const { result } = this.props;
        return(
            <div className="AccountGenerator">
                <small id="generatedCoin">{result ? <T>All pubkeys was generated successful</T> : null}</small>
                <div className="progress">
                    <div id="generateProgress" className="progress-bar" style={{width: result ? '100%' : '0%'}}/>
                </div>
            </div>
        )
    }
}

export default stepWrapper(define.steps.generateXpub)(AccountsGenerator);

import React, { Component } from 'react';
import { HDNode } from "bitcoinjs-lib";
import { coins } from "../assets";
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
        const { getStepResult } = this.props;
        const { hex }= getStepResult(define.steps.generateImage);
        const node = HDNode.fromSeedHex(hex);

        const e = coins[index];
        if (index < coins.length) {
            const message = `${e.name}`;
            setProgress(accounts.length, coins.length, message, true);
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
                <p><T>Public keys allow to get the balance of the wallet and compose unsigned transactions but do not have enough rights to move cryptoassets from the wallet. Only public keys will be shared with WMSCrypto servers.</T></p>
                <small id="generatedCoin">{result ? <T>All pubkeys was generated successful</T> : null}</small>
                <div className="progress">
                    <div id="generateProgress" className="progress-bar" style={{width: result ? '100%' : '0%'}}/>
                </div>
            </div>
        )
    }
}

export default stepWrapper(define.steps.generateXpub)(AccountsGenerator);

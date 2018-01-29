import React, { Component } from 'react';
import { MnemonicsInput, CreatePassword, NextButton, Card, DownloadButton, LastStep } from '../components/index';
import aes from "crypto-js/aes";
import AccountsGenerator from "../components/AccountsGenerator";
import {messages} from "../assets";

class ConnectWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mnemonicsData: null,
            password: null,
            aesPassword: null,
            encryptedMnemonics: null,
            accounts: null
        }
    }

    generateMnemonics() {
        const { aesPassword, mnemonicsData } = this.state;
        const encryptedMnemonics = aes.encrypt(JSON.stringify({
            mnemonics: mnemonicsData.mnemonics,
            password: mnemonicsData.password
        }), aesPassword);
        this.setState({
            encryptedMnemonics
        })
    }


    render() {
        const { aesPassword, mnemonicsData, encryptedMnemonics, accounts } = this.state;
        return(
            <div>
                <MnemonicsInput encrypted={false}
                                mnemonicsLabel="Mnemonics"
                                passwordLabel="Password"
                                buttonLabel="Create mnemonics seed"
                                disabled={!!mnemonicsData}
                                onValidate={(data) => this.setState({mnemonicsData: data})}/>
                <br/>
                {mnemonicsData ? <CreatePassword setPassword={(p) => {this.setState({aesPassword: p})}}
                                                 disabled={!!encryptedMnemonics}/> : null}
                <br/>
                {mnemonicsData
                    ? <NextButton title="Encrypt mnemonics"
                                  disabled={!aesPassword || encryptedMnemonics}
                                  onClick={() => this.generateMnemonics()}/>
                    : null
                }
                <br/>
                {encryptedMnemonics
                    ? <Card><DownloadButton title="Download encrypted mnemonics"
                                            id="encryptedMnemonics"
                                            obj={{
                                                encryptedMnemonics: encryptedMnemonics.toString(),
                                                version: '0.1'
                                            }}/></Card>
                    : null
                }
                <br/>
                {encryptedMnemonics
                    ? <AccountsGenerator onGenerate={(accounts) => this.setState({accounts})}
                                         disabled={!!accounts}
                                         hex={mnemonicsData.hex}/>
                    : null
                }
                <br/>
                {accounts
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

export default ConnectWallet;
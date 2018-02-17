import React, { Component } from 'react';
import aes from 'crypto-js/aes';
import { messages } from '../assets';
import { sendPut, encryptMnemonicsByAnchor } from '../utils';
import {
    Card,
    NextButton,
    CreatePassword,
    LastStep,
    DownloadButton,
    MnemonicsInput
} from '../components';
import { t } from '../utils/translate';


class ChangeWalletPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEncryptedMnemonics: null,
            mnemonics: null,
            password: '',
            newPassword: null,
            passwordInvalid: false,
            visibleMnemonics: false
        }
    }

    generateMnemonics() {
        const { newPassword, mnemonics } = this.state;
        const encryptedMnemonics = aes.encrypt(mnemonics, newPassword);
        this.setState({
            newEncryptedMnemonics: encryptedMnemonics
        })
    }

    render() {
        const { newEncryptedMnemonics, mnemonics, newPassword } = this.state;
        const { uuid, encryptedMnemonics, onOperationResult } = this.props;
        return (
            <div>
                <MnemonicsInput encrypted={true}
                                buttonLabel={t("Decrypt mnemonics")}
                                passwordLabel="Password"
                                mnemonicsLabel="Mnemonics"
                                uuid={uuid}
                                encryptedMnemonics={encryptedMnemonics}
                                onValidate={(d) => this.setState({mnemonics: d})}
                                disabled={!!mnemonics}/>

                <br/>
                {mnemonics ? <CreatePassword setPassword={(p) => {this.setState({newPassword: p})}}/> : null}
                <br/>
                {newPassword
                    ? <NextButton title={t("Encrypt mnemonics")}
                                  disabled={!!newEncryptedMnemonics}
                                  onClick={() => this.generateMnemonics()}/>
                    : null
                }
                <br/>
                {newEncryptedMnemonics
                    ? <Card><DownloadButton title={t("Download encrypted mnemonics")}
                                            id="newEncryptedMnemonics"
                                            obj={{
                                                encryptedMnemonics: newEncryptedMnemonics.toString(),
                                                version: '0.1'
                                            }}/></Card>
                    : null
                }
                <br/>
                {newEncryptedMnemonics
                    ? <LastStep title={t("Save mnemonics")}
                                hide={false}
                                important={true}
                                message={messages.SAVE_WALLETS}
                                onClick={() =>{sendPut(
                                    uuid,
                                    {encryptedMnemonics: encryptMnemonicsByAnchor(newEncryptedMnemonics)},
                                    (status, data, uuid) => onOperationResult(status)
                                )}}/>
                    : null
                }
                <br/>
            </div>
        )
    }
}

export default ChangeWalletPassword;
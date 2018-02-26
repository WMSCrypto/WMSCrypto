import React, { Component } from 'react';
import { Card, CoinsList, JSONUploader, MnemonicsInput, TxSigner }from "../components";
import {
    CommonBitcoinTransactionForm
} from "../components/TransactionForms/BitcoinTransactionForm";
import {t} from "../utils/translate";
import EthereumTransactionFrom from "../components/TransactionForms/EthereumTransactionForm";


class MakeTransaction extends Component {

    constructor(props) {
        super(props);
        let data = {};
        if (props.data) {
            data = props.data
        }
        this.state = {
            coin: data.coin || 0,
            isFile: false,
            isManual: false,
            isOnline: !!props.uuid,
            transactionSaved: !!props.uuid,
            decryptedMnemonics: null,
            transaction: data || {},
            allowSave: false
        }
    }
    updateTransaction(key, value, valid) {
        let { transaction } = this.state;
        if (!key) {
            this.setState({transaction: {...transaction, ...value}, allowSave: valid})
        } else {
            transaction[key] = value;
            this.setState({transaction, allowSave: valid})
        }
    }

    renderAdditional(coin) {
        const { transaction, isFile, isOnline, transactionSaved } = this.state;
        switch (coin) {
            case 0:
                return <CommonBitcoinTransactionForm transaction={transaction}
                                                     external={isOnline || isFile}
                                                     block={transactionSaved || isFile}
                                                     onSet={(k, v, b) => this.updateTransaction(k, v, b)}/>;
            case 60:
                return <EthereumTransactionFrom transaction={transaction}
                                                block={transactionSaved || isFile}
                                                onSet={(k, v, b) => this.updateTransaction(k, v, b)}/>
            default:
                return null
        }
    }

    getTopQuestion() {
        const { isManual, isFile, coin } = this.state;
        const { uuid } = this.props;
        if (isManual || uuid) {
            return null
        } else {
            return (
                <React.Fragment>
                    <Card>
                        <JSONUploader title={t('Upload file with transaction data')}
                                      disabled={!!isFile}
                                      onValid={(data) => {
                                          this.setState({
                                              transaction: data,
                                              isFile: true,
                                              transactionSaved: true,
                                              coin: data.coin
                                          })
                                      }}/>
                        {!isFile
                            ? <CoinsList onChange={(d) => this.setState(d)}
                                         onSave={() => this.setState({isManual: true})}
                                         value={coin}
                                         filterKey="txEnable"/>
                            : null
                        }
                    </Card>
                    <br/>
                </React.Fragment>

            )
        }
    }

    renderTransactionControls() {
        const { transactionSaved, allowSave } = this.state;
        const toggle = () => this.setState({transactionSaved: !transactionSaved});
        return (
            <React.Fragment>
                <button className="btn btn-primary" onClick={toggle} disabled={!allowSave}>
                    {transactionSaved ? 'Edit' : 'Save'}
                </button>
            </React.Fragment>
        )

    }
    render() {
        const { coin, decryptedMnemonics, isFile, isManual, isOnline, transactionSaved, transaction } = this.state;
        const { uuid, encryptedMnemonics, onOperationResult } = this.props;
        const setType = isFile || isManual || isOnline;
        const topQuestionComponent = this.getTopQuestion();
        const transactionForm = setType ? this.renderAdditional(coin) : null;
        const transactionControls = !(isFile || isOnline) ? this.renderTransactionControls() : null;
        return (
            <div>
                {topQuestionComponent}
                {transactionForm
                    ? <Card>
                        {transactionForm}
                        {transactionControls}
                      </Card>
                    : null
                }
                <br/>
                <div style={{display: transactionSaved ? 'block' : 'none'}}>
                    <MnemonicsInput encrypted={true}
                                    buttonLabel="Decrypt mnemonics"
                                    passwordLabel="Password"
                                    mnemonicsLabel="Mnemonics"
                                    uuid={uuid}
                                    encryptedMnemonics={encryptedMnemonics}
                                    onValidate={(d) => this.setState({decryptedMnemonics: d})}
                                    disabled={!!decryptedMnemonics}/>
                </div>

                <br/>
                <TxSigner mnemonics={decryptedMnemonics}
                          coin={coin}
                          transaction={transaction}
                          transactionSaved={transactionSaved}
                          onOperationResult={onOperationResult}/>
                <br/>
            </div>
        )
    }
}

export default MakeTransaction;
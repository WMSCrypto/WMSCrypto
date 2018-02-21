import React, { Component } from 'react';
import { Card, CoinsList, JSONUploader, MnemonicsInput, TxSigner }from "../components";
import {
    CommonBitcoinTransactionForm
} from "../components/TransactionForms/BitcoinTransactionForm";
import {t} from "../utils/translate";


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
        }
    }
    updateTransaction(key, value) {
        let { transaction } = this.state;
        transaction[key] = value;
        this.setState({transaction})
    }

    renderAdditional(coin) {
        switch (coin) {
            case 0:
                const { transaction, isFile, isOnline, transactionSaved } = this.state;
                return <CommonBitcoinTransactionForm transaction={transaction}
                                                     external={isOnline || isFile}
                                                     block={transactionSaved || isFile}
                                                     onSet={(k, v) => this.updateTransaction(k, v)}/>;
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
        const { transactionSaved } = this.state;
        const toggle = () => this.setState({transactionSaved: !transactionSaved});
        return (
            <React.Fragment>
                <br/>
                <button className="btn btn-primary" disabled={transactionSaved} onClick={toggle}>
                    Save
                </button>
                <span> </span>
                <button className="btn btn-secondary" disabled={!transactionSaved} onClick={toggle}>
                    Edit
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
                          transaction={transaction}
                          transactionSaved={transactionSaved}
                          coin={coin}
                          uuid={uuid}
                          onOperationResult={onOperationResult}/>
                <br/>
            </div>
        )
    }
}

export default MakeTransaction;
import React, { Component } from 'react';
import { Card, CoinsList, JSONUploader, TxSigner }from "../components";
import {
    CommonBitcoinTransactionForm
} from "../components/TransactionForms/BitcoinTransactionForm";
import { t } from "../utils/translate";
import EthereumTransactionFrom from "../components/TransactionForms/EthereumTransactionForm";
import WalletImageReader from "../components/WalletImage/WalletImageReader";

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
            transaction: data || {},
            allowSave: false,
            seed: null
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
        const { coin, isFile, isManual, isOnline, transactionSaved, transaction, seed } = this.state;
        const { uuid, onOperationResult } = this.props;
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
                <div style={{display: transactionSaved ? 'block' : 'none'}}>
                    <WalletImageReader onUnlock={(seed) => this.setState({ seed })} seed={ seed }/>
                </div>
                <TxSigner seed={seed}
                          coin={coin}
                          uuid={uuid}
                          transaction={transaction}
                          transactionSaved={transactionSaved}
                          onOperationResult={onOperationResult}/>
            </div>
        )
    }
}

export default MakeTransaction;
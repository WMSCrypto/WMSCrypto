import React, { Component } from 'react';
import { Card, CoinsList, JSONUploader, MnemonicsInput, TxSigner }from "../components";
import {
    InputsBitcoinForm,
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
            coin: data.coin ? data.coin.toString() : "0",
            isFile: false,
            isManual: false,
            isOnline: !!props.uuid,
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
            case "0":
                const { transaction } = this.state;
                return <CommonBitcoinTransactionForm transaction={transaction}
                                                     onSet={(k, v) => this.updateTransaction(k, v)}/>;
            default:
                return null
        }
    }

    getTopQuestion() {
        const { isManual, isFile } = this.state;
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
                                          this.setState({transaction: data, isFile: true})
                                      }}/>
                        {!isFile
                            ? <button onClick={() => this.setState({isManual: true})}
                                      className="btn btn-primary">{t('Manual creation')}</button>
                            : null
                        }
                    </Card>
                    <br/>
                </React.Fragment>

            )
        }
    }

    render() {
        const { coin, fromData, decryptedMnemonics, txData, isManual } = this.state;
        const { data, uuid, encryptedMnemonics, onOperationResult } = this.props;
        const txParams = (data && data.txParams) ? data.txParams : {};
        const topQuestionComponent = this.getTopQuestion();
        return (
            <div>
                {topQuestionComponent}
                <Card>
                    <CoinsList onChange={(e) => this.setState({coin: e.target.value})}
                               value={coin}
                               filterKey="txEnable"
                               disabled={!!uuid}/>
                    {this.renderAdditional(coin)}
                </Card>
                <br/>
                <InputsBitcoinForm coin={coin}
                                        {...txParams}
                                        onUpdate={(d) => {this.updateTransaction('inputs', d)}}/>
                <MnemonicsInput encrypted={true}
                                buttonLabel="Decrypt mnemonics"
                                passwordLabel="Password"
                                mnemonicsLabel="Mnemonics"
                                uuid={uuid}
                                encryptedMnemonics={encryptedMnemonics}
                                onValidate={(d) => this.setState({decryptedMnemonics: d})}
                                disabled={!!decryptedMnemonics}/>

                <br/>
                <TxSigner mnemonics={decryptedMnemonics}
                          address={null}
                          addressData={null}
                          uuid={uuid}
                          txData={txData}
                          onOperationResult={onOperationResult}/>
                <br/>
            </div>
        )
    }
}

export default MakeTransaction;
import React from 'react';
import Base58Input from "../../Inputs/Base58Input";
import { t } from '../../../utils/translate';
import SatoshiInput from "../../Inputs/SatoshInput";
import InputsBitcoinForm from "./InputsBitcoinForm";
import AdditionalForm from "./AdditionalForm";


const SummaryElement = ({ name, value }) => {
    return (
        <div>
            <p>{t(name)}: <strong>{value}</strong></p>
        </div>
    )
};

class CommonBitcoinTransactionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullView: !props.external,
        }
    }

    renderSummary(amount, fee, change, value, receiver, useRBF, locktime) {
        return (
            <div>
                <SummaryElement name="Receiver" value={receiver}/>
                <SummaryElement name="Value" value={`${value} BTC`}/>
                <SummaryElement name="Change" value={`${change} BTC`}/>
                <SummaryElement name="Amount" value={`${amount} BTC`}/>
                <SummaryElement name="Fee" value={`${fee} BTC`}/>
                <SummaryElement name="Use RBF" value={useRBF ? 'Using' : 'Not using'}/>
                <SummaryElement name="Locktime" value={locktime || 'Not using'}/>
            </div>
        )
    }

    renderInformation(amount, fee, change, address, account, value, receiver, useRBF, locktime, inputs, external) {
        const { onSet } = this.props;
        const block = !!this.props.block;
        return (
            <React.Fragment>
                <InputsBitcoinForm onUpdate={(d) => {onSet('inputs', d)}}
                                   block={block}
                                   inputs={inputs}
                                   external={external}/>
                <Base58Input label={t('Receiver')}
                             disabled={block}
                             value={receiver}
                             onSet={(v) => onSet('receiver', v)}
                             required={true}/>
                <div className="form-row">
                    <div className="col-md-9">
                        <SatoshiInput label={t('Value')}
                                      disabled={block}
                                      value={value}
                                      onSet={(v) => onSet('value', v)}
                                      required={true}/>
                    </div>
                    <div className="col-md-3">
                        <div className="d-none d-sm-block">
                            <p className="invisible">Empty</p>
                        </div>
                        <p style={{textAlign: 'right'}}>
                            {t('Fee')}:
                            <strong className={fee < 0 ? 'text-danger' : ''}> {(fee * Math.pow(10, -8)).toFixed(8)} BTC</strong>
                        </p>
                    </div>
                </div>
                <AdditionalForm {...{ onSet, locktime, useRBF, block, address, account, change }}/>
            </React.Fragment>
        )
    }

    render() {
        const { transaction, external } = this.props;
        const {
            receiver, inputs,
            value=0, change=0, account,
            address, useRBF, locktime
        } = transaction;
        const { fullView } = this.state;
        const amount = inputs ? inputs.reduce((p, i) => p + (i.value || 0), 0) : 0;
        const fee = (amount - (value + change )) || 0;
        return (
            <React.Fragment>
                <div className="BitcoinHeader">
                    <p>Bitcoin</p>
                    <div className="btn-group">
                        <button className={`btn btn-${fullView ? 'outline-' : ''}secondary btn-sm`}
                                onClick={() => this.setState({fullView: false})}>{t('Summary')}</button>
                        <button className={`btn btn-${!fullView ? 'outline-' : ''}secondary btn-sm`}
                                onClick={() => this.setState({fullView: true})}>{t('Information')}</button>
                    </div>
                </div>
                {fullView
                    ? this.renderInformation(amount, fee, change, address, account, value, receiver, useRBF, locktime, inputs, external)
                    : this.renderSummary(amount, fee, change, value, receiver, useRBF, locktime)
                }
            </React.Fragment>
        )
    }
}

CommonBitcoinTransactionForm.defaultProps = {
    transaction: {
        receiver: '',
        locktime: '',
        value: 0,
        change: 0,
        useChange: true,
        useRBF: true,
        address: 0,
        account: 0
    },
    block: false
};

export default CommonBitcoinTransactionForm;
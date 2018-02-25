import React from 'react';
import Base58Input from "../../Inputs/Base58Input";
import { t } from '../../../utils/translate';
import SatoshiInput from "../../Inputs/SatoshInput";
import InputsBitcoinForm from "./InputsBitcoinForm";
import AdditionalForm from "./AdditionalForm";
import HidingCard from "../../HidingCard";
import IntegerInput from "../../Inputs/IntegerInput";


const SummaryElement = ({ name, value }) => {
    return (
        <div>
            <p>{t(name)}: <strong>{value}</strong></p>
        </div>
    )
};

const BTC = (v) => {
    return `${(Math.pow(10, -8) * v).toFixed(8)} BTC`;
};

class CommonBitcoinTransactionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullView: !props.external,
        }
    }

    renderSummary(fee, value, receiver) {
        return (
            <div>
                <SummaryElement name="Receiver" value={receiver || '???'}/>
                <SummaryElement name="Value" value={BTC(value)}/>
                <SummaryElement name="Fee" value={BTC(fee)}/>
            </div>
        )
    }

    renderDetail(amount, fee, change, address, account, value, receiver, useRBF, locktime, inputs, external, useChange) {
        const { onSet } = this.props;
        const block = !!this.props.block;
        return (
            <React.Fragment>
                <InputsBitcoinForm onUpdate={(d) => {onSet('inputs', d)}}
                                   block={block}
                                   inputs={inputs}
                                   external={external}/>
                <HidingCard title={`${t('Output')} 0`}>
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
                </HidingCard>
                {useChange
                    ? <AdditionalForm {...{onSet, block, address, account, change}}/>
                    : <button className="btn btn-outline-primary" onClick={() => onSet('useChange', true)} style={{marginBottom: 16}}>
                        {t('Add change')}
                      </button>
                }
                <IntegerInput required={false}
                          disabled={block}
                          label={t('Locktime')}
                          value={locktime}
                          onSet={(v) => onSet('locktime', v)}/>
                <div className="form-check">
                    <input type="checkbox"
                           disabled={block}
                           className="form-check-input"
                           checked={useRBF}
                           onChange={() => onSet('useRBF', !useRBF)}/>
                    <lable className="form-check-label">{t('Use RBF')}</lable>
                </div>
                <br/>
            </React.Fragment>
        )
    }

    render() {
        const { transaction, external } = this.props;
        const {
            receiver, inputs,
            value=0, change=0, account,
            useChange=false,
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
                                onClick={() => this.setState({fullView: true})}>{t('Detail')}</button>
                    </div>
                </div>
                {fullView
                    ? this.renderDetail(
                        amount, fee, change,
                        address, account, value,
                        receiver, useRBF, locktime,
                        inputs, external, useChange)
                    : this.renderSummary(fee, value, receiver)
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
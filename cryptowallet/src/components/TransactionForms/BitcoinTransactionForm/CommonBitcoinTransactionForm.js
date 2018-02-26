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

const validation = (m, b) => {
    if (b) {
        return m
    } else {
        return <span>{m} <span className="badge badge-danger">{t('invalid')}</span></span>;
    }
};

class CommonBitcoinTransactionForm extends React.Component {

    constructor(props) {
        super(props);
        const { external } = props;
        this.state = {
            fullView: !external,
            validated: {
                inputs: external || false,
                receiver: external || false,
                value: external || true,
                change: external || true,
                account: external || true,
                address: external || true
            }
        }
    }

    renderSummary(fee, value, receiver, display) {
        return (
            <div style={{display: display ? 'block' : 'none'}}>
                <SummaryElement name="Receiver" value={receiver || '???'}/>
                <SummaryElement name="Value" value={BTC(value)}/>
                <SummaryElement name="Fee" value={BTC(fee)}/>
            </div>
        )
    }

    validatedSet(key, value, validObject) {
        const { onSet } = this.props;
        const { validated } = this.state;
        const newValidated = {...validated, ...validObject};
        const formIsValid = Object.keys(newValidated).reduce((p, i) => newValidated[i] && p, true);
        this.setState({validated: newValidated});
        onSet(key, value, formIsValid)

    }

    renderDetail(amount, fee, change, address, account, value, receiver, useRBF, locktime, inputs, external, useChange, display) {
        const { validated } = this.state;
        const receiverValidation = validation(`${t('Output')} 0`, validated.receiver && validated.value);
        const { onSet } = this.props;
        const block = !!this.props.block;
        return (
            <div style={{display: display ? 'block' : 'none'}}>
                <InputsBitcoinForm onUpdate={(d, b) => {this.validatedSet('inputs', d, {inputs: b})}}
                                   block={block}
                                   inputs={inputs}
                                   external={external}/>
                <HidingCard title={receiverValidation}>
                    <Base58Input label={t('Receiver')}
                                 disabled={block}
                                 value={receiver}
                                 onSet={(v, valid) => this.validatedSet(
                                        'receiver', v, {receiver: valid}
                                      )}
                                 required={true}/>
                    <div className="form-row">
                        <div className="col-md-9">
                            <SatoshiInput label={t('Value')}
                                          disabled={block}
                                          value={value}
                                          onSet={(v) => this.validatedSet(
                                              'value', v, {value: v !== ''}
                                              )}
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
                    ? <AdditionalForm {...{onSet: this.validatedSet.bind(this), block, address, account, change}}/>
                    : <button className="btn btn-outline-primary" onClick={
                        () => this.validatedSet(
                            'useChange', true, {change: change !== '', account: account !== '', address: address !== ''}
                            )} style={{marginBottom: 16}}>
                        {t('Add change')}
                      </button>
                }
                <IntegerInput required={false}
                          disabled={block}
                          label={t('Locktime')}
                          value={locktime}
                          onSet={(v) => {
                              const l = v.toString().length;
                              if (l > 8) {
                                  v = parseInt(v.toString().slice(0, 8), 10)
                              }
                              this.validatedSet('locktime', v, {})}
                          }/>
                <div className="form-check">
                    <input type="checkbox"
                           disabled={block}
                           className="form-check-input"
                           checked={useRBF}
                           onChange={() => this.validatedSet('useRBF', !useRBF, {})}/>
                    <lable className="form-check-label">{t('Use RBF')}</lable>
                </div>
                <br/>
            </div>
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
                {this.renderDetail(
                    amount, fee, change,
                    address, account, value,
                    receiver, useRBF, locktime,
                    inputs, external, useChange, fullView)}
                {this.renderSummary(fee, value, receiver, !fullView)}
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
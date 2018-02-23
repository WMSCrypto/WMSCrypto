import React from 'react';
import Base58Input from "../../Inputs/Base58Input";
import { t } from '../../../utils/translate';
import SatoshiInput from "../../Inputs/SatoshInput";
import InputsBitcoinForm from "./InputsBitcoinForm";
import AdditionalForm from "./AdditionalForm";

class CommonBitcoinTransactionForm extends React.Component {

    render() {
        const { transaction, onSet, external } = this.props;
        const {
            receiver, inputs,
            value=0, change=0, account,
            address, useRBF, locktime
        } = transaction;
        const amount = inputs ? inputs.reduce((p, i) => p + (i.value || 0), 0) : 0;
        const fee = (amount - (value + change )) || 0;
        const block = !!this.props.block;
        return (
            <React.Fragment>
                <p>Bitcoin</p>
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
                    <div className="col-md-6">
                        <SatoshiInput label={t('Value')}
                                      disabled={block}
                                      value={value}
                                      onSet={(v) => onSet('value', v)}
                                      required={true}/>
                    </div>
                    <div className="col-md-6">
                        <div className="d-none d-sm-block">
                            <p className="invisible">Empty</p>
                        </div>
                        <p>
                            {t('Fee')}:
                            <strong className={fee < 0 ? 'text-danger' : ''}> {(fee * Math.pow(10, -8)).toFixed(8)} BTC</strong>
                        </p>
                    </div>
                </div>
                <AdditionalForm {...{ onSet, locktime, useRBF, block, address, account, change }}/>
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
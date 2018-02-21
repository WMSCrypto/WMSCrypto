import React from 'react';
import IntegerInput from "../../Inputs/IntegerInput";
import Base58Input from "../../Inputs/Base58Input";
import WalletAddressInput from "../../Inputs/WalletAddressInput";
import { t } from '../../../utils/translate';
import SatoshiInput from "../../Inputs/SatoshInput";
import InputsBitcoinForm from "./InputsBitcoinForm";

class CommonBitcoinTransactionForm extends React.Component {

    render() {
        const { transaction, onSet, external } = this.props;
        const {
            receiver, inputs,
            value, useChange, account,
            address, useRBF, locktime
        } = transaction;
        const amount = inputs ? inputs.reduce((p, i) => p + (i.value || 0), 0) : 0;
        const block = !!this.props.block;
        return (
            <React.Fragment>
                <p>Bitcoin</p>
                <InputsBitcoinForm onUpdate={(d) => {onSet('inputs', d)}}
                                   block={block}
                                   inputs={inputs}
                                   external={external}/>
                <div className="form-row">
                    <div className="col-md-6">
                        <SatoshiInput disabled={true}
                                      required={true}
                                      value={amount}
                                      label={t('Amount')}/>
                    </div>
                    <div className="col-md-6">
                        <SatoshiInput disabled={true}
                                      required={true}
                                      value={amount - value}
                                      label={t('Fee')}/>
                    </div>
                </div>
                <Base58Input label={t('Receiver')}
                             disabled={block}
                             value={receiver}
                             onSet={(v) => onSet('receiver', v)}
                             required={true}/>
                <SatoshiInput label={t('Value')}
                              disabled={block}
                              value={value}
                              onSet={(v) => onSet('value', v)}
                              required={true}/>
                <div className="form-check">
                    <input type="checkbox"
                           disabled={block}
                           className="form-check-input"
                           checked={useChange}
                           onChange={() => onSet('useChange', !useChange)}/>
                    <lable className="form-check-label">{t('Use change')}</lable>
                </div>
                {useChange
                    ? <WalletAddressInput disabled={{change: true, all: block}}
                                          purpose={44}
                                          coin={0}
                                          account={account}
                                          change={1}
                                          address={address}
                                          onSet={(obj) => {
                                              onSet('address', obj.address);
                                              onSet('account', obj.account);
                                          }}
                                          title="Full change address: "/>
                    : null }
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
            </React.Fragment>
        )
    }
}

CommonBitcoinTransactionForm.defaultProps = {
    transaction: {
        receiver: '',
        locktime: '',
        value: 0,
        useChange: true,
        useRBF: true,
        address: 0,
        account: 0
    },
    block: false
};

export default CommonBitcoinTransactionForm;
import React from 'react';
import HidingCard from "../../HidingCard";
import { t } from '../../../utils/translate';
import IntegerInput from "../../Inputs/IntegerInput";
import WalletAddressInput from "../../Inputs/WalletAddressInput";
import SatoshiInput from "../../Inputs/SatoshInput";

const AdditionalForm = ({ onSet, useRBF, locktime, block, account, address, change }) => {
    return (
        <HidingCard title={t('Additional')}>
            <SatoshiInput label={t('Change')}
                          disabled={block}
                          value={change}
                          onSet={(v) => onSet('change', v)}
                          required={false}/>
            <WalletAddressInput disabled={{change: true, all: block}}
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
        </HidingCard>
    )
};

export default AdditionalForm;
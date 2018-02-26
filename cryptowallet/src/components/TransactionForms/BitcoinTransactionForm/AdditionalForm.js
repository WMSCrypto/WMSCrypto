import React from 'react';
import HidingCard from "../../HidingCard";
import { t } from '../../../utils/translate';
import WalletAddressInput from "../../Inputs/WalletAddressInput";
import SatoshiInput from "../../Inputs/SatoshInput";

const validation = (m, b) => {
    if (b) {
        return m
    } else {
        return <span>{m} <span className="badge badge-danger">{t('invalid')}</span></span>;
    }
};

const AdditionalForm = ({ onSet, block, account, address, change }) => {
    const titleName = `${t('Output')} 1`;
    const title = validation(titleName, change !== '', address !== '', account !== '');
    return (
        <HidingCard title={title} onDelete={!block ? () => onSet('useChange', false, {change: true, address: true, account: true}) : null}>
            <SatoshiInput label={t('Change')}
                          disabled={block}
                          value={change}
                          onSet={(v) => onSet('change', v, {change: v !== ''})}
                          required={true}/>
            <WalletAddressInput disabled={{change: true, all: block}}
                                          purpose={44}
                                          coin={0}
                                          account={account}
                                          change={1}
                                          address={address}
                                          onSet={(obj) => {
                                              onSet('address', obj.address, {address: obj.address !== ''});
                                              onSet('account', obj.account, {account: obj.account !== ''});
                                          }}
                                          title="Full change address: "/>
        </HidingCard>
    )
};

export default AdditionalForm;
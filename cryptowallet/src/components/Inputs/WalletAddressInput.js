import React from 'react';
import IntegerInput from "./IntegerInput";
import {getFullAdrress} from '../../utils';

const WalletAddressInput = ({ onSet, purpose, coin, account=0, change=0, address=0, disabled={}, title='' }) => {
    return (
        <React.Fragment>
            <div className="form-row">
                <div className="col-md-4">
                    <IntegerInput value={account}
                                  label="Account"
                                  disabled={disabled.account || disabled.all}
                                  required={true}
                                  onSet={(v) => onSet({account: v, change, address})}/>
                </div>
                <div className="col-md-4">
                    <label>Change</label>
                    <select className="form-control"
                            disabled={disabled.change || disabled.all}
                            value={change}
                            required={true}
                            onChange={(e) => onSet({
                                account,
                                change: parseInt(e.target.value, 10),
                                address
                            })}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <IntegerInput value={address}
                                  label="Address"
                                  disabled={disabled.address || disabled.all}
                                  required={true}
                                  onSet={(v) => onSet({account, change, address: v})}/>
                </div>
            </div>
            <div className={`alert alert-${disabled.all ? 'secondary' : 'primary'}`}>
                <span>{title}{getFullAdrress({purpose, coin, account, change, address})}</span>
            </div>
        </React.Fragment>
    )
};

export default WalletAddressInput
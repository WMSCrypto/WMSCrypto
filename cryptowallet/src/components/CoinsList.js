import React from 'react';
import { coins } from '../assets';
import { t } from '../utils/translate';

const CoinsList = (props) => {
    const { onChange, onSave, value, filterKey, disabled } = props;
    return (
        <div className="form-group">
            <div className="input-group">
                <select className="form-control"
                        id="coinsList"
                        onChange={(e) => {
                            onChange({coin: parseInt(e.target.value, 10)})
                        }}
                        value={value || coins[0]}
                        disabled={disabled}>
                    {coins.filter((k) => filterKey ? k[filterKey] : true).map((e) => (
                        <option value={e.id} key={`coin-name-${e.name}`}>{e.name}</option>
                    ))}
                </select>
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={onSave}>
                        {t('Manual creation')}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default CoinsList;
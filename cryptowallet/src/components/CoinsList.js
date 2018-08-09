import React from 'react';
import { coins } from '../assets';

const CoinsList = (props) => {
    const { onChange, value, filterKey, disabled } = props;
    return (
        <div className="form-group">
            <div className="input-group">
                <select className="Select"
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
            </div>
        </div>
    )
};

export default CoinsList;
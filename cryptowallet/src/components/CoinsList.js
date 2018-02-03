import React from 'react';
import { coins } from '../assets';

const CoinsList = (props) => {
    const { onChange, value, filterKey } = props;
    return (
        <div className="form-group">
            <label>Choice coin</label>
            <select className="form-control" id="coinsList" onChange={onChange} value={value || coins[0]}>
                {coins.filter((k) => filterKey ? k[filterKey] : true).map((e) => (
                    <option value={e.id} key={`coin-name-${e.name}`}>{e.name}</option>
                ))}
            </select>
        </div>
    )
};

export default CoinsList;
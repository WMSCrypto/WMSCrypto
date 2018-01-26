import React from 'react';
import { coins } from '../assets';

const CoinsList = (props) => {
    const { onChange, value } = props;
    return (
        <select class="form-control" id="coinsList" onChange={onChange} value={value || coins['Bitcoin']}>
            {Object.keys(coins).map((e, i) => (
                <option value={coins[e]} key={`coin-id-${coins[e]}`}>{e}</option>
            ))}
        </select>
    )
};

export default CoinsList;
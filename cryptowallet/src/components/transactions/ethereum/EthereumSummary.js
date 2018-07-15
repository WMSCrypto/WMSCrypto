import React from 'react';
import TransactionField from "../TransactionField";
import erc20 from './erc20';

const weiToETH = (v) => {
    return  v.toFixed(18).toString()
};

const calcFee = ({ gasPrice, gasLimit }) => {
    const fee = (gasPrice * gasLimit / Math.pow(10, 18));
    return weiToETH(fee)
};

const parse = (exchange_info, token_info, data, value, receiver, manual ) => {
    let result = {
        value: value && `${weiToETH(parseInt(value) * Math.pow(10, -18))} ETH`,
        receiver: receiver,
        data: data
    };
    if (manual) {
        return result
    }
    const [ err, parsed ] = data ? erc20({data, ...token_info}) : [null, null];
    if (value > 0 && exchange_info) {
        result.receiver = null;
        result.value = `${value} ETH`;
        result.data = parsed ? parsed['erc20_data'] : err;
    } else if (value === 0 && exchange_info) {
        result.receiver = null;
        result.value = parsed && !parsed['erc20_data']
            ? `${parsed['erc20_value'] / Math.pow(10, parsed['erc20_decimals'])} ${parsed['erc20_symbol']}`
            : null
    } else if (value > 0 && !exchange_info) {
        result.receiver = receiver
    } else if (value === 0 && !exchange_info) {
        result.receiver = parsed ? parsed['erc20_receiver'] : null;
        result.value = parsed && !parsed['erc20_data']
            ? `${parsed['erc20_value'] / Math.pow(10, parsed['erc20_decimals'])} ${parsed['erc20_symbol']}`
            : null
    }
    return result;
};

export default ({ fieldsValues, data, manual }) => {
    const { data: ethData, value, to: receiver }= fieldsValues;
    const { exchange_info, token_info } = data;
    const needCalcFee = fieldsValues['gasPrice'] !== undefined && fieldsValues['gasLimit'] !== undefined;
    const parsed = parse(exchange_info,token_info, ethData, value, receiver, manual);
    return (
        <React.Fragment>
            {parsed.value
                ? <TransactionField valid={true}
                                    name="Value"
                                    value={parsed.value}/>
                : null
            }
            {parsed.receiver
                ? <TransactionField valid={true}
                                    name="Receiver"
                                    value={parsed.receiver}/>
                : null
            }
            <TransactionField valid={needCalcFee}
                              name="Fee"
                              value={needCalcFee ? `max. ${calcFee(fieldsValues)} ETH` : '???'}/>
            {parsed.data
                ? <TransactionField valid={true}
                                    name="Data"
                                    value={parsed.data}/>
                : null
            }
        </React.Fragment>
    )
}
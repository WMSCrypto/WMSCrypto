import React from 'react';
import TransactionField from "../TransactionField";
import erc20 from './erc20';

const calcFee = ({ gasPrice, gasLimit }) => {
    const fee = (gasPrice * gasLimit / Math.pow(10, 18)).toFixed(18).toString();
    let numbers = false;
    return  fee.split('').map(i => {
        if (!numbers) {
            numbers = i !== '.' && i !== '0';
            return i
        } else {
            return i !== '0' ? i : ''
        }
    }).join('')
};

const parse = (exchange_info, token_info, data, value, receiver) => {
    const [ err, parsed ] = data ? erc20({data, ...token_info}) : [null, null];
    let result = {
        value: `${value} ETH`,
        data: err ? err : parsed['erc20_data']
    };
    if (value === 0 && exchange_info) {
        result.receiver = null;
        result.value = !err && !parsed['erc20_data']
            ? `${parsed['erc20_value'] / Math.pow(10, parsed['erc20_decimals'])} ${parsed['erc20_symbol']}`
            : null
    } else if (value > 0 && !exchange_info) {
        result.receiver = receiver
    } else if (value === 0 && !exchange_info) {
        result.receiver = !err ? parsed['erc20_receiver'] : null;
        result.value = !err && !parsed['erc20_data']
            ? `${parsed['erc20_value'] / Math.pow(10, parsed['erc20_decimals'])} ${parsed['erc20_symbol']}`
            : null
    }
    return result;
};

export default ({ fieldsValues, data }) => {

    const { data: ethData, value, receiver }= fieldsValues;
    const { exchange_info, token_info } = data;
    const needCalcFee = fieldsValues['gasPrice'] !== undefined && fieldsValues['gasLimit'] !== undefined;
    const parsed = parse(exchange_info,token_info, ethData, value, receiver);
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
                              value={needCalcFee ? `${calcFee(fieldsValues)} ETH` : '???'}/>
            {parsed.data
                ? <TransactionField valid={true}
                                    name="Data"
                                    value={parsed.data}/>
                : null
            }
        </React.Fragment>
    )
}
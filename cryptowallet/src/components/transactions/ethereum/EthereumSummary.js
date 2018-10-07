import React from 'react';
import TransactionField from "../TransactionField";
import erc20 from './erc20';
import fieldViews from '../../../core/fields/fieldsViews';
import {BigNumber} from "bignumber.js";

const calcFee = ({ gasPrice, gasLimit }) => {
    const fee = fieldViews.bigView(new BigNumber(gasPrice).multipliedBy(new BigNumber(gasLimit)), 18);
    return fee.toString()
};

const parse = (exchange_info, token_info, data, value, receiver, manual ) => {
    let result = {
        value: value && `${fieldViews.bigView(value, 18)} ETH`,
        receiver: receiver,
        data: data
    };
    if (manual) {
        return result
    }
    const vInt = value ? parseInt(value, 10) : 0;
    const [ err, parsed ] = data ? erc20({data, ...token_info}) : [null, null];
    if (vInt > 0 && exchange_info) {
        result.receiver = null;
        result.value = `${fieldViews.bigView(value, 18)} ETH`;
        result.data = parsed ? parsed['erc20_data'] : err;
    } else if (vInt === 0 && exchange_info) {
        result.receiver = null;
        result.value = parsed && !parsed['erc20_data']
            ? `${fieldViews.bigView(parsed['erc20_value'], parsed['erc20_decimals'])} ${parsed['erc20_symbol']}`
            : null;
        result.data = parsed && parsed['erc20_data'] ? parsed['erc20_data'] : null;
    } else if (vInt > 0 && !exchange_info) {
        result.receiver = receiver
    } else if (vInt === 0 && !exchange_info) {
        result.receiver = parsed ? parsed['erc20_receiver'] : null;
        result.value = parsed && !parsed['erc20_data']
            ? `${fieldViews.bigView(parsed['erc20_value'], parsed['erc20_decimals'])} ${parsed['erc20_symbol']}`
            : null;
        result.data = parsed && parsed['erc20_data'] ? parsed['erc20_data'] : null;
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
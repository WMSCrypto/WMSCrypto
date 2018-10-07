import {BigNumber} from "bignumber.js";

const erc20 = {
    "0x18160ddd" : [
        () => "totalSupply()",
        []
    ],
    "0x70a08231" : [
        ([i]) => `balanceOf(${i})`,
        ["address"]
    ],
    "0xa9059cbb" : [
        ([i, j]) => `transfer(${i}, ${j})`,
        ["address", "uint256"]
    ],
    "0x23b872dd" : [
        ([i, j, k]) => `transferFrom(${i}, ${j}, ${k})`,
        ["address", "address", "uint256"]
    ],
    "0x095ea7b3" : [
        ([i, j]) => `approve(${i}, ${j})`,
        ["address", "uint256"]
    ],
    "0xdd62ed3e" : [
        ([i, j]) => `allowance(${i}, ${j})`,
        ["address", "address"]
    ],
    "0xddf252ad" : [
        ([i, j, k]) => `Transfer(${i}, ${j}, ${k})`,
        ["address", "address", "uint256"]
    ],
    "0x8c5be1e5" : [
        ([i, j, k]) => `Approval(${i}, ${j}, ${k})`,
        ["address", "address", "uint256"]
    ]
};

const parse = (tx) => {
    try {
        if (!tx.startsWith('0x')) { tx = '0x' + tx; }
        if (tx === '0x') { return ['Not data', null, []]}
        const [command, args] = erc20[tx.slice(0, 10)];
        let cursor = 10;
        const values = [];
        args.forEach((arg) => {
            cursor = cursor + 64;
            const val = tx.slice(cursor - 64, cursor);
            if (arg === 'address') {
                values.push(`0x${val.slice(24)}`)
            } else if (arg === 'uint256') {
                values.push(new BigNumber(val, 16).toString(16))
            } else {
                throw Error();
            }
        });
        if (tx.length !== cursor) {
            throw Error();
        }
        return [null, command, values]
    } catch (e) {
        return ['Not erc20 interface', null, []]
    }
};

export default ({ data, symbol, decimals }) => {
    const [ error, command, values ] = parse(data);
    const parsedCommand = command && command(values);
    let result;
    if (symbol && decimals && parsedCommand && parsedCommand.startsWith('transfer(')) {
        result = {
            erc20_value: new BigNumber(values[1], 16),
            erc20_receiver: values[0],
            erc20_symbol: symbol,
            erc20_decimals: decimals
        }
    } else {
        result = {erc20_data: parsedCommand};
    }
    return [ error, result ]
};
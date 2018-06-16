import EthereumTx from "ethereumjs-tx";
import { HDNode } from "bitcoinjs-lib";

const getPrivKey = (seed, address) => {
    const node = HDNode.fromSeedHex(seed);
    const addressNode = node.derivePath(address);
    return addressNode.keyPair.d.toBuffer(32).toString('hex');
};

const signEthereumTransaction = (hex, txParams) => {
    const privateKey = Buffer.from(hex, 'hex');
    const tx = new EthereumTx(txParams);
    tx.sign(privateKey);
    return tx.serialize();
};

const hexView = (v) => {
    if (v === '') {
        return '0x'
    } else {
        const intValue = Number.isInteger(v) ? v : parseInt(v, 10);
        return `0x${intValue.toString(16)}`
    }
};

const getETXTxData = (nonce, value, gasPrice, gasLimit, to, data, chainId=1) => {
    return {
        nonce: hexView(nonce),
        value: hexView(Math.pow(10, 18) * parseFloat(value)),
        gasPrice: hexView(gasPrice),
        gasLimit: hexView(gasLimit),
        to: to,
        data: data,
        chainId
    }
};

const ethereumSigner = (seed, transaction) => {
    const { account, change, address } = transaction;
    const privKey = getPrivKey(seed, `m/44'/60'/${account}'/${change}/${address}`);
    const { nonce, value, gasPrice, gasLimit, to, data } = transaction;
    const txData = getETXTxData(nonce, value, gasPrice, gasLimit, to, data);
    const tx = signEthereumTransaction(privKey, txData);
    return tx.toString('hex');
};

export default ethereumSigner;
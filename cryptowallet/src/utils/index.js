import bip39 from 'bip39';
import EthereumTx from 'ethereumjs-tx';
import { HDNode } from "bitcoinjs-lib";

const getPrivKey = (mnemonics, address) => {
    let seed;
    try {
        const obj = JSON.parse(mnemonics);
        seed = bip39.mnemonicToSeed(obj.mnemonics, obj.salt);
    } catch (e) {
        seed = bip39.mnemonicToSeed(mnemonics);
    }
    const node = HDNode.fromSeedBuffer(seed);
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
        value: hexView(Math.pow(10, 18) * value),
        gasPrice: hexView(gasPrice),
        gasLimit: hexView(gasLimit),
        to: to,
        data: data,
        chainId
    }
};

const sendPut = (uuid, data, callback) => {
    fetch(`/api/operations/${uuid}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data})})
        .then((res) => res.status)
        .then((status) => {
            callback(status, data, uuid)
        })
        .catch(() => {
            callback(null, data, uuid)
        })
};

export {
    getPrivKey,
    hexView,
    signEthereumTransaction,
    getETXTxData,
    sendPut
}
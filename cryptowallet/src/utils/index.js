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
    const privKey = addressNode.keyPair.d.toBuffer(32).toString('hex');
    console.log(`Get private key for address ${address}: ${privKey}`);
    return privKey;
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
        const intValue = Number.isInteger(v) ? v : parseInt(v);
        return `0x${intValue.toString(16)}`
    }
};

const getETXTxData = (nonce, value, gasPrice, gasLimit, to, data, chainId=1) => {
    return {
        nonce: hexView(nonce),
        value: hexView(Math.pow(10, 18) * value),
        gasPrice: hexView(gasPrice),
        gasLimit: hexView(gasLimit),
        to: `0x${to}`,
        data: data && `0x${data}`,
        chainId
    }
};

export {
    getPrivKey,
    hexView,
    signEthereumTransaction,
    getETXTxData
}
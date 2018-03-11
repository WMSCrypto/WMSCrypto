import { getETXTxData, getPrivKey, signEthereumTransaction, getSeed } from './index';
import { TransactionBuilder, HDNode } from "bitcoinjs-lib";


const getNode = (mnemonics, account, change, address) => {
    const seed = getSeed(mnemonics);
    const node = HDNode.fromSeedBuffer(seed);
    return node.derivePath(`m/44'/0'/${account}'/${change}/${address}`);
};

const ethSign = (mnemonics, transaction) => {
    const { account, change, address } = transaction;
    const privKey = getPrivKey(mnemonics, `m/44'/60'/${account}'/${change}/${address}`);
    const { nonce, value, gasPrice, gasLimit, to, data } = transaction;
    const txData = getETXTxData(nonce, value, gasPrice, gasLimit, to, data);
    const tx = signEthereumTransaction(privKey, txData);
    return tx.toString('hex');
};

const bitcoinSign = (mnemonics, transaction) => {
    let txb = new TransactionBuilder();
    const sequence = transaction.useRBF ? 4294967293 : undefined;
    if (transaction.locktime) {
        txb.setLockTime(transaction.locktime)
    }
    transaction.inputs.forEach(i => {
        txb.addInput(i.prevout_hash, i.prevout_n, sequence)
    });
    txb.addOutput(transaction.receiver, transaction.value);

    if (transaction.useChange) {
        const node = getNode(mnemonics, transaction.account, 1, transaction.address);
        txb.addOutput(node.getAddress(), transaction.change);
    }

    transaction.inputs.forEach((i, index) => {
        const node = getNode(mnemonics, i.account, i.change, i.address);
        txb.sign(index, node.keyPair)
    });

    return txb.build().toHex();
};

const Signers = {
    0: bitcoinSign,
    60: ethSign
};

export default Signers;
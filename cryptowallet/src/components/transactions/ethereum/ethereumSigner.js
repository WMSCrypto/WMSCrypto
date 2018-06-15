import { HDNode, TransactionBuilder } from "bitcoinjs-lib";

const getNode = (seed, account, change, address) => {
    const node = HDNode.fromSeedHex(seed);
    return node.derivePath(`m/44'/0'/${account}'/${change}/${address}`);
};

const ethereumSigner = (seed, transaction) => {
    let txb = new TransactionBuilder();
    const sequence = transaction.useRBF ? 4294967293 : undefined;
    if (transaction.locktime) {
        txb.setLockTime(transaction.locktime)
    }
    transaction.inputs.forEach(i => {
        txb.addInput(i.prevout_hash, i.prevout_n, sequence)
    });
    txb.addOutput(transaction.receiver.address, transaction.receiver.value);

    if (transaction.change) {
        const node = getNode(seed, transaction.change.account, 1, transaction.change.address);
        txb.addOutput(node.getAddress(), transaction.change.value);
    }

    transaction.inputs.forEach((i, index) => {
        const node = getNode(seed, i.account, i.change, i.address);
        txb.sign(index, node.keyPair)
    });

    return txb.build().toHex();
};

export default ethereumSigner;
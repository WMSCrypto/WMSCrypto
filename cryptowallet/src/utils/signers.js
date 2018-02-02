import { getPrivKey, signEthereumTransaction } from './index';


const ethSign = (mnemonics, address, txData) => {
    const privKey = getPrivKey(mnemonics, address);
    const tx = signEthereumTransaction(privKey, txData);
    return tx.toString('hex');
};

const Signers = {
    "60": ethSign
};

export default Signers;
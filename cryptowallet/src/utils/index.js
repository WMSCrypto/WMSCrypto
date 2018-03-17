import aes from 'crypto-js/aes';
import bip39 from 'bip39';
import EthereumTx from 'ethereumjs-tx';
import { HDNode } from "bitcoinjs-lib";
import UTF8 from "crypto-js/enc-utf8";

const MNEMONICS_BITS = 256;
const FLAG_SLICE = -2;
const WITH_ANCHOR_FLAG = '00';
const WITHOUT_ANCHOR_FLAG = '01';

const tryDecrypt = (text, password) => {
    try {
        const bytes = aes.decrypt(text, password);
        return UTF8.stringify(bytes);
    } catch (err) {
        console.log("Cannot decrypt text");
        return null
    }
};

const encryptSeed = (seedHex, password, anchor) => {
    let encrypted = aes.encrypt(seedHex, password);
    if (anchor) {
        encrypted = aes.encrypt(encrypted.toString(), anchor) + WITH_ANCHOR_FLAG;
    } else {
        encrypted = encrypted + WITHOUT_ANCHOR_FLAG
    }

    return encrypted
};

const decryptSeed = (text, password, anchor) => {
    const flag = text.slice(FLAG_SLICE);
    let encrypted = text.slice(0, FLAG_SLICE);
    if (!anchor && flag === WITH_ANCHOR_FLAG) {
        return ['ERROR 1', null]
    }

    if (anchor) {
        encrypted = tryDecrypt(encrypted, anchor);
        if (!encrypted) {
            return ['ERROR 2', null]
        }
    }

    const decrypted = tryDecrypt(encrypted, password);
    if (decrypted) {
        return [null, decrypted]
    } else {
        return ['ERROR 3', null]
    }
};

const generateSeed = ({ password, mnemonics=null, salt=null, anchor=null }) => {
    if (!mnemonics) {
        mnemonics = bip39.generateMnemonic(MNEMONICS_BITS);
    }
    let seedHex;

    seedHex = bip39.mnemonicToSeedHex(mnemonics, salt);

    const encrypted = encryptSeed(seedHex, password, anchor);

    return {
        hex: seedHex,
        encrypted
    }
};


const cryptoCheck = () => {
    try {
        bip39.generateMnemonic();
        return true
    } catch (e) {
        console.log('Cannot generate mnemonics');
        return false
    }
};

const getAnchor = () => {
    const anchor = window.location.hash.substr(1);
    return anchor.length ? anchor : null
};

const generateSeedWithCheckAnchor = (password) => {
    return generateSeed({ password, anchor: getAnchor() })
};

const enctryptSeedWithCheckAnchor = (text, password) => {
    return encryptSeed(text, password, getAnchor())
};

const decryptSeedWithCheckAnchor = (text, password) => {
    return decryptSeed(text, password, getAnchor())
};

const callbackByAnchor = (data, func) => {
    const anchor = window.location.hash.substr(1);
    if (anchor.length) {
        return func(data, anchor);
    } else {
        return data
    }
};

const encryptMnemonicsByAnchor = (encryptedMnemonics) => {
    const s = encryptedMnemonics.toString();
    return callbackByAnchor(s, aes.encrypt).toString()
};

const getSeed = (mnemonics) => {
    try {
        const obj = JSON.parse(mnemonics);
        return bip39.mnemonicToSeed(obj.mnemonics, obj.salt);
    } catch (e) {
        return bip39.mnemonicToSeed(mnemonics);
    }
};

const getPrivKey = (mnemonics, address) => {
    const seed = getSeed(mnemonics);
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
        value: hexView(Math.pow(10, 18) * parseFloat(value)),
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

const dropLocation = () => {
    window.location.hash = '';
    window.location.pathname = '';
};


const getFullAdrress = ({ purpose=44, coin, account, change, address }) => {
    return `m/${purpose}'/${coin}'/${account}'/${change}/${address}`
};

const setState = (instance, name, value, callback) => {
    let obj = {};
    obj[name] = value;
    instance.setState(obj, callback);
};

export {
    getPrivKey,
    hexView,
    signEthereumTransaction,
    getETXTxData,
    sendPut,
    dropLocation,
    callbackByAnchor,
    encryptMnemonicsByAnchor,
    getFullAdrress,
    setState,
    generateSeed,
    encryptSeed,
    decryptSeed,
    cryptoCheck,
    getSeed,
    decryptSeedWithCheckAnchor,
    enctryptSeedWithCheckAnchor,
    generateSeedWithCheckAnchor
}
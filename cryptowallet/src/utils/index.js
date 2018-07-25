import aes from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';
import bip39 from 'bip39';
import EthereumTx from 'ethereumjs-tx';
import { HDNode } from "bitcoinjs-lib";

const MNEMONICS_BITS = 256;
const WITH_ANCHOR_FLAG = '00';
const WITHOUT_ANCHOR_FLAG = '01';
const ANCHOR_SLICE = -8;

const TG_LINK =
    window.location.host === 'beta.wms.cr'
        ? 'tg://resolve?domain=WMSCryptoTestBot'
        : 'tg://resolve?domain=WMSCryptoBot';

const encryptSeed = (seedHex, password, anchor) => {
    let encrypted;
    if (anchor) {
        password = password + anchor;
        encrypted = aes.encrypt(seedHex, password) + sha256(anchor).toString().slice(ANCHOR_SLICE) + WITH_ANCHOR_FLAG;
    } else {
        encrypted = aes.encrypt(seedHex, password) + WITHOUT_ANCHOR_FLAG
    }

    return encrypted
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

const enctryptSeedWithCheckAnchor = (text, password) => {
    return encryptSeed(text, password, getAnchor())
};

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

const getUUID = () => {
    const pathArray = window.location.pathname.split('/');
    return pathArray.length === 2 && pathArray[1].length ? pathArray[1] : null;
};

const getRandomMnemonicIndex = () => {
  return Math.floor(Math.random() * Math.floor(24));
};

const inputClasses = (valid) => {
    return ["form-control", !valid ? 'is-invalid' : ''].join(' ')
};

export {
    getPrivKey,
    hexView,
    signEthereumTransaction,
    getETXTxData,
    sendPut,
    dropLocation,
    getFullAdrress,
    setState,
    encryptSeed,
    cryptoCheck,
    enctryptSeedWithCheckAnchor,
    MNEMONICS_BITS,
    getUUID,
    getAnchor,
    getRandomMnemonicIndex,
    inputClasses,
    TG_LINK
}
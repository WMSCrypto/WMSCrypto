import aes from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';
import bip39 from 'bip39';
import EthereumTx from 'ethereumjs-tx';
import { HDNode } from "bitcoinjs-lib";
import UTF8 from "crypto-js/enc-utf8";
import { ENCRYPTED_BY_ANCHOR, ENCRYPTED_WITHOUT_ANCHOR} from "../assets/messages";

const MNEMONICS_BITS = 256;
const FLAG_SLICE = -2;
const WITH_ANCHOR_FLAG = '00';
const WITHOUT_ANCHOR_FLAG = '01';
const ANCHOR_SLICE = -8;
const WITH_ANCHOR_LEGTNH = FLAG_SLICE + ANCHOR_SLICE;

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
    let encrypted;
    if (anchor) {
        password = password + anchor;
        encrypted = aes.encrypt(seedHex, password) + sha256(anchor).toString().slice(ANCHOR_SLICE) + WITH_ANCHOR_FLAG;
    } else {
        encrypted = aes.encrypt(seedHex, password) + WITHOUT_ANCHOR_FLAG
    }

    return encrypted
};

const decryptSeed = (text, password, anchor) => {
    const flag = text.slice(FLAG_SLICE);
    let encrypted;
    if (anchor) {
        encrypted = text.slice(0, WITH_ANCHOR_LEGTNH);
    } else {
        encrypted = text.slice(0, FLAG_SLICE);
    }

    if (!anchor && flag === WITH_ANCHOR_FLAG) {
        return [ENCRYPTED_BY_ANCHOR, null]
    }

    if (anchor && flag === WITHOUT_ANCHOR_FLAG) {
        return [ENCRYPTED_WITHOUT_ANCHOR, null]
    }

    if (anchor) {
        const decrypted = tryDecrypt(encrypted, password + anchor);
        if (!decrypted) {
            if (sha256(anchor).toString().slice(ANCHOR_SLICE) !== text.slice(WITH_ANCHOR_LEGTNH, FLAG_SLICE)) {
                return ["Invalid anchor", null]
            } else {
                return ["Invalid password", null]
            }
        } else {
            return [null, decrypted]
        }
    } else {
        const decrypted = tryDecrypt(encrypted, password);
        if (!decrypted) {
            return ["Invalid password", null]
        } else {
            return [null, decrypted]
        }

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
        mnemonics: mnemonics,
        hex: seedHex,
        encrypted,
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

export {
    getPrivKey,
    hexView,
    signEthereumTransaction,
    getETXTxData,
    sendPut,
    dropLocation,
    getFullAdrress,
    setState,
    generateSeed,
    encryptSeed,
    decryptSeed,
    cryptoCheck,
    decryptSeedWithCheckAnchor,
    enctryptSeedWithCheckAnchor,
    generateSeedWithCheckAnchor,
    MNEMONICS_BITS,
}
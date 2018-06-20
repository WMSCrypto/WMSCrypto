import bip39 from 'bip39';
import { getAnchor } from '../../utils/index'
import CryptoJS from "crypto-js";
import legacy from './legacy';
import {
    ENCRYPTED_BY_ANCHOR,
    ENCRYPTED_WITHOUT_ANCHOR
} from "../../assets/messages";


const MNEMONICS_BITS = 256;
const WITH_ANCHOR_FLAG = '03';
const WITHOUT_ANCHOR_FLAG = '04';
const FLAG_SLICE = -2;
const ANCHOR = getAnchor();
const IV_LENGTH = 32;
const WORD_ARRAY_LENGTH = 16;
const INVALID_PASSWORD_ERROR = 'Invalid password';

const tryDecrypt = (func) => {
    try {
        const bytes = func();
        const string = CryptoJS.enc.Utf8.stringify(bytes);
        return [
            string !== '' ? null : INVALID_PASSWORD_ERROR,
            string !== '' ? string : null
        ]
    } catch (e) {
        return [INVALID_PASSWORD_ERROR, null]
    }

};

const encryptSeed = (seedHex, password, anchor) => {
    let passwordHash = CryptoJS.SHA256(password).toString();
    let flag = WITHOUT_ANCHOR_FLAG;
    if (anchor) {
        passwordHash = CryptoJS.HmacSHA256(password, anchor);
        flag = WITH_ANCHOR_FLAG;
    }
    const iv = CryptoJS.lib.WordArray.random(WORD_ARRAY_LENGTH);
    const encryptedSeedHex = CryptoJS.AES.encrypt(seedHex, passwordHash, {iv: iv}).toString();
    return encryptedSeedHex + iv.toString() + flag;
};

const decryptSeed = (text, password, anchor) => {
    const flag = text.slice(FLAG_SLICE);
    // Old version capability
    if (legacy[flag] !== undefined) {
        return legacy[flag](text, flag, password, anchor)
    }

    text = text.slice(0, FLAG_SLICE);
    if (!anchor && flag === WITH_ANCHOR_FLAG) {
        return [ENCRYPTED_BY_ANCHOR, null]
    }

    if (anchor && flag === WITHOUT_ANCHOR_FLAG) {
        return [ENCRYPTED_WITHOUT_ANCHOR, null]
    }

    let passwordHash = CryptoJS.SHA256(password).toString();
    if (anchor) {
        passwordHash = CryptoJS.HmacSHA256(password, anchor);
    }
    return tryDecrypt(() => {
        const ivHex = text.slice(-1 * IV_LENGTH);
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const encryptedSeedHex = text.slice(0, text.length - IV_LENGTH);
        return CryptoJS.AES.decrypt(encryptedSeedHex, passwordHash, {iv: iv});

    })
};

const generateSeedObj = ({ password, mnemonics=null, salt=null, anchor=ANCHOR }) => {
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

const generateMnemonics = () => {
    return bip39.generateMnemonic(MNEMONICS_BITS)
};

export {
    encryptSeed,
    decryptSeed,
    generateSeedObj,
    generateMnemonics,
    tryDecrypt,
    FLAG_SLICE
}
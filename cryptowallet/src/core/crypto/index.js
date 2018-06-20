import bip39 from 'bip39';
import { getAnchor } from '../../utils/index'
import sha256 from "crypto-js/sha256";
import aes from "crypto-js/aes";
import method03 from './method03';


const MNEMONICS_BITS = 256;
const WITH_ANCHOR_FLAG = '00';
const WITHOUT_ANCHOR_FLAG = '01';
const ANCHOR_SLICE = -8;
const ANCHOR = getAnchor();

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

const methods = {};

methods[method03.FLAG] = {
    ...method03
};

export {
    ANCHOR,
    generateSeedObj,
    generateMnemonics,
    methods
}
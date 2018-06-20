// Method using save iv, HMAC sha256 for password and not anchor
import CryptoJS from 'crypto-js';
import { IV_LENGTH, WORD_ARRAY_LENGTH } from "./common";

const FLAG = '03';

const encrypt = (seedHex, password) => {
    const iv = CryptoJS.lib.WordArray.random(WORD_ARRAY_LENGTH);
    const passHash = CryptoJS.SHA256(password).toString();
    const encryptedSeedHex = CryptoJS.AES.encrypt(seedHex, passHash, {iv: iv}).toString();
    return encryptedSeedHex + iv.toString()
};

const decrypt = (encryptedString, password) => {
    const ivHex = encryptedString.slice(-1 * IV_LENGTH);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const passHash = CryptoJS.SHA256(password).toString();
    const encryptedSeedHex = encryptedString.slice(0, encryptedString.length - IV_LENGTH);
    const bytes = CryptoJS.AES.decrypt(encryptedSeedHex, passHash, {iv: iv});
    return CryptoJS.enc.Utf8.stringify(bytes)
};

export default {
    encrypt,
    decrypt,
    FLAG
}

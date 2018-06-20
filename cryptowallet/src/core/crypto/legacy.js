import sha256 from "crypto-js/sha256";
import {
    ENCRYPTED_BY_ANCHOR, ENCRYPTED_WITHOUT_ANCHOR
} from "../../assets/messages";
import aes from "crypto-js/aes";
import UTF8 from "crypto-js/enc-utf8";
import { FLAG_SLICE, tryDecrypt } from "./index";


// const tryDecrypt = (text, password) => {
//     try {
//         const bytes = aes.decrypt(text, password);
//         return UTF8.stringify(bytes);
//     } catch (err) {
//         return null
//     }
// };

const decryptSeed1 = (text, flag, password, anchor) => {
    const withAnchorFlag = '00';
    const withoutAnchor = '01';
    const anchorSlice = -8;
    const withAnchorLength = FLAG_SLICE + anchorSlice;
    let encrypted;
    if (anchor) {
        encrypted = text.slice(0, withAnchorLength);
        password = password + anchor;
        if (sha256(anchor).toString().slice(anchorSlice) !== text.slice(withAnchorLength, FLAG_SLICE)) {
            return ["Invalid anchor", null]
        }

    } else {
        encrypted = text.slice(0, FLAG_SLICE);
    }

    if (!anchor && flag === withAnchorFlag) {
        return [ENCRYPTED_BY_ANCHOR, null]
    }

    if (anchor && flag === withoutAnchor) {
        return [ENCRYPTED_WITHOUT_ANCHOR, null]
    }
    return tryDecrypt(() => aes.decrypt(text, password))
};

let legacy = {};
legacy['00'] = decryptSeed1;
legacy['01'] = decryptSeed1;

export default legacy;
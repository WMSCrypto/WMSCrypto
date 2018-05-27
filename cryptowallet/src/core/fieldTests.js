import bs58check from 'bs58check';

const hexRe = new RegExp("^[0-9a-fA-F]*$");

const integer = (v) => /^\d+$/.test(v);

const base58 = (v) => {
    try {
        bs58check.decode(v);
        return true;
    } catch (e) {
        return false
    }
};

const hex = (v) => {
    if (!v) {
        return false
    }

    if (v.slice(0, 2) === '0x') {
        return hexRe.test(v.slice(2))
    } else {
        return hexRe.test(v)
    }
};

const satoshi = (v) => /^\d+\.{0,1}\d{0,8}$/.test(v);

const oneOrTwo = (v) => {
    const parsed = parseInt(v, 10);
    if (parsed !== null) {
        return [0, 1].indexOf(parsed) !== -1
    } else {
        return false
    }
};

const bool = (v) => typeof(v) === "boolean";

export default {
    integer,
    base58,
    hex,
    satoshi,
    oneOrTwo,
    bool
}
import bip39 from 'bip39';

const MNEMONICS_BITS = 256;

const generateMnemonics = () => bip39.generateMnemonic(MNEMONICS_BITS);


export {
    generateMnemonics
}
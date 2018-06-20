import assert from 'assert';
import { encryptSeed, decryptSeed } from './core/crypto';

const TEST_PASSWORD = 'password';
const TEST_ANCHOR = 'anchor';
const TEST_MNEMONICS = (
    'truck unfair vote open sting airport speak ' +
    'awesome recall end symbol chef siren zoo session ' +
    'claw anchor text chimney mandate lottery turn admit ankle'
);

const TEST_SEED = '50b714e8180491d8f4adba64fb217baa3a568478be719f8d810b39eafea0229466bf8728375136510ed6755f8a260b903ca902930b9a91b2d9f87931b8990182';

describe('CryptoWallet', function () {

    it('Successful encrypt/decrypt', function () {
        const encrypted = encryptSeed(TEST_SEED, TEST_PASSWORD);
        const [_, decrypted ]= decryptSeed(encrypted, TEST_PASSWORD);
        assert.equal(decrypted, TEST_SEED)
    });

});
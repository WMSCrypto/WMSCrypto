import assert from 'assert';
import { encryptSeed, decryptSeed, generateSeedObj } from './core/crypto';


const TEST_SALT = 'salt';
const TEST_PASSWORD = 'wms.cr3738%';
const TEST_ANCHOR = 'anchor';
const TEST_MNEMONICS = (
    'truck unfair vote open sting airport speak ' +
    'awesome recall end symbol chef siren zoo session ' +
    'claw anchor text chimney mandate lottery turn admit ankle'
);

const TEST_SEED = '50b714e8180491d8f4adba64fb217baa3a568478be719f8d810b39eafea0229466bf8728375136510ed6755f8a260b903ca902930b9a91b2d9f87931b8990182';
const TEST_SEED_WITH_SALT = '75bd76431df75fe6e75fdbfd58fdb9c11b7d9860b6104ac0a22f1823593dc2ef37de57351c907a8b7ff9e0f7216d633684a7d41aaa63b9bc7f074e3933beb36e'
const LEGACY_00_KEY = 'U2FsdGVkX19KmVzqqZiuVMYuYyZNaa/KWzqpHtwnXVFg2HMNLLBa08Ot8JdiJvjeWa6S0ihT83djMpes2yYvt1MKiTtwrEyjH8WDq8aOhtbhLVUY+LQA69kSTW61gCkFKs5Ss4oZFIyPOgEVbMnVTEr2Ery+J+1LpwHV4xqIl+CPRhkwsKsn7OZBcAtm1sYD75nvSCK8DKCr4EKIpudOug==7a3c5bcd00'
const LEGACY_01_KEY = 'U2FsdGVkX1+5RHg3ObdPPBuwCJ/CtD9mc3usltRuj8gjv4wl0K3ITbTlthVHJ1xtP/Xuitt6tbjcE2wBj2Lf3s9mL0cSjrlT2dz8RFq+7utjGIKDB3x2JzRGeGs8Vn6OxMQplhJIauSWqibI/c+ojzPT9dBgXOZtihsrXzYAFgw+NE6fWgGixWBFKTSJ7NoradvP/nZ7J3jII4zReCCpNQ==01';

describe('CryptoWallet', function () {

    it('Successful encrypt/decrypt', function () {
        const encrypted = encryptSeed(TEST_SEED, TEST_PASSWORD);
        const [_, decrypted ]= decryptSeed(encrypted, TEST_PASSWORD);
        assert.equal(decrypted, TEST_SEED)
    });

    it('Successful decrypt legacy 00', function () {
        const [ _, decrypted ]= decryptSeed(LEGACY_00_KEY, TEST_PASSWORD, TEST_ANCHOR);
        expect(decrypted).not.toBe(null)
    });

    it('Successful decrypt legacy 01', function () {
        const [ _, decrypted ]= decryptSeed(LEGACY_01_KEY, '1');
        expect(decrypted).not.toBe(null)
    });

    it('generate seed', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS});

        assert.equal(seed.hex, TEST_SEED);

        const [_, decrypted] = decryptSeed(seed.encrypted, TEST_PASSWORD);
        assert.equal(decrypted, TEST_SEED);
    });

    it('generate seed with salt', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, salt: TEST_SALT});

        assert.equal(seed.hex, TEST_SEED_WITH_SALT);

        const [_, decrypted] = decryptSeed(seed.encrypted, TEST_PASSWORD);
        assert.equal(decrypted, TEST_SEED_WITH_SALT);
    });

    it('generate seed with anchor', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [_, decrypted] = decryptSeed(seed.encrypted, TEST_PASSWORD, TEST_ANCHOR);
        assert.equal(decrypted, TEST_SEED);
    });

    it('generate seed with salt and anchor', function () {
        const seed = generateSeedObj({
            password: TEST_PASSWORD,
            mnemonics: TEST_MNEMONICS,
            salt: TEST_SALT,
            anchor: TEST_ANCHOR
        });

        assert.equal(seed.hex, TEST_SEED_WITH_SALT);

        const [_, decrypted] = decryptSeed(seed.encrypted, TEST_PASSWORD, TEST_ANCHOR);
        assert.equal(decrypted, TEST_SEED_WITH_SALT);
    });

    it('decrypt seed invalid password', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, 'invalidPassword');
        assert.equal(error, "Invalid password");
    });

    it('decrypt seed invalid password but valid anchor', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, 'invalidPassword', TEST_ANCHOR);
        assert.equal(error, "Invalid password");
    });

    it('decrypt seed invalid password with anchor', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, 'invalidPassword', TEST_ANCHOR);
        assert.equal(!!error, true);
    });

    it('decrypt seed encrypted with anchor but decrypt without', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, TEST_PASSWORD);
        assert.equal(!!error, true);
    });

    it('decrypt seed encrypted without anchor but decrypt with', function () {
        const seed = generateSeedObj({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, TEST_PASSWORD, TEST_ANCHOR);
        assert.equal(!!error, true);
    })

});
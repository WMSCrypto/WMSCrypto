import assert from 'assert';
import {
    getPrivKey,
    hexView,
    signEthereumTransaction,
    getETXTxData,
    generateSeed,
    decryptSeed,
} from './utils';

const TEST_MNEMONICS = (
    'truck unfair vote open sting airport speak ' +
    'awesome recall end symbol chef siren zoo session ' +
    'claw anchor text chimney mandate lottery turn admit ankle'
);

const TEST_SEED = '50b714e8180491d8f4adba64fb217baa3a568478be719f8d810b39eafea0229466bf8728375136510ed6755f8a260b903ca902930b9a91b2d9f87931b8990182'

const TEST_PASSWORD = 'password';
const TEST_SALT = 'salt';
const TEST_ANCHOR = 'anchor';
const TEST_SEED_WITH_SALT = '75bd76431df75fe6e75fdbfd58fdb9c11b7d9860b6104ac0a22f1823593dc2ef37de57351c907a8b7ff9e0f7216d633684a7d41aaa63b9bc7f074e3933beb36e'


describe('CryptoWallet', function () {

    it('int to hex', function () {
        assert.equal(hexView(21000), '0x5208')
    });

    it('transaction for ETH data', function () {
        const requiredTx = {
            nonce: '0x0',
            value: '0xde0b6b3a7640000',
            gasPrice: '0x0',
            gasLimit: '0x5208',
            to: '0xAB1182654936eaf254915bC6aF2C1460b26A658a',
            data: '',
            chainId: 1
        };
        const tx = getETXTxData(0, 1, 0, 21000, '0xAB1182654936eaf254915bC6aF2C1460b26A658a', '');
        Object.keys(tx).forEach(k => {
            assert.equal(tx[k], requiredTx[k])
        })
    });

    it('can get private key from mnemonics', function () {
        const privKey = getPrivKey(TEST_MNEMONICS, "m/44'/60'/0'/0/1");
        assert.equal( privKey, '78bd734be30ddcf45b14d07684743fdb391ec5efbe24e83996f2cc46aad9a17e');
    });

    it('can get private key from salted mnemonics', function () {
        const mnemonics = `{"mnemonics": "${TEST_MNEMONICS}", "salt": ""}`;
        const privKey = getPrivKey(mnemonics, "m/44'/60'/0'/0/1");
        assert.equal( privKey, '78bd734be30ddcf45b14d07684743fdb391ec5efbe24e83996f2cc46aad9a17e');
    });

    it('sign transaction', function () {

        const privKey = getPrivKey(TEST_MNEMONICS, "m/44'/60'/0'/0/1");
        const txData = {
            nonce: '0x00',
            value: '0x0de0b6b3a7640000',
            gasPrice: '0x00',
            gasLimit: '0x5208',
            to: '0xAB1182654936eaf254915bC6aF2C1460b26A658a',
            data: '',
            chainId: 1
        };
        const tx = signEthereumTransaction(privKey, txData);
        assert.equal(
            tx.toString('hex'),
            'f867808082520894ab1182654936eaf254915bc6af2c1460b26a658a880de0b6b3a76400008026a044811a522c5c73cc52febfcbb95f89f8620c5ff8296d8af4a2271bc3c9d2a21ba02c2a6fa74355d7d820c294b1fa3fb72f579f7afe0f5555e55408dc0ecb55f23c'
        );
    });

    it('generate seed', function () {
        const seed = generateSeed({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS});

        assert.equal(seed.hex, TEST_SEED);

        const [_, decrypted] = decryptSeed(seed.encrypted, TEST_PASSWORD);
        assert.equal(decrypted, TEST_SEED);
    });

    it('generate seed with salt', function () {
        const seed = generateSeed({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, salt: TEST_SALT});

        assert.equal(seed.hex, TEST_SEED_WITH_SALT);

        const [_, decrypted] = decryptSeed(seed.encrypted, TEST_PASSWORD);
        assert.equal(decrypted, TEST_SEED_WITH_SALT);
    });

    it('generate seed with anchor', function () {
        const seed = generateSeed({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [_, decrypted] = decryptSeed(seed.encrypted, TEST_PASSWORD, TEST_ANCHOR);
        assert.equal(decrypted, TEST_SEED);
    });

    it('generate seed with salt and anchor', function () {
        const seed = generateSeed({
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
        const seed = generateSeed({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, 'invalidPassword');
        assert.equal(!!error, true);
    });

    it('decrypt seed invalid anchor', function () {
        const seed = generateSeed({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, TEST_PASSWORD, 'invalidAnchor');
        assert.equal(!!error, true);
    });

    it('decrypt seed invalid password with anchor', function () {
        const seed = generateSeed({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, 'invalidPassword', TEST_ANCHOR);
        assert.equal(!!error, true);
    });

    it('decrypt seed ecrypted with anchor but decrypt without', function () {
        const seed = generateSeed({password: TEST_PASSWORD, mnemonics: TEST_MNEMONICS, anchor: TEST_ANCHOR});

        assert.equal(seed.hex, TEST_SEED);

        const [error, _] = decryptSeed(seed.encrypted, TEST_PASSWORD);
        assert.equal(!!error, true);
    })

});
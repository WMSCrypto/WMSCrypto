import assert from 'assert';
import { getPrivKey, hexView, signEthereumTransaction, getETXTxData } from './utils';


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
        const tx = getETXTxData(0, 1, 0, 21000, 'AB1182654936eaf254915bC6aF2C1460b26A658a', '');
        Object.keys(tx).forEach(k => {
            assert.equal(tx[k], requiredTx[k])
        })
    });

    it('can get private key from mnemonics', function () {
        const mnemonics = (
            'truck unfair vote open sting airport speak ' +
            'awesome recall end symbol chef siren zoo session ' +
            'claw anchor text chimney mandate lottery turn admit ankle'
        );
        const privKey = getPrivKey(mnemonics, "m/44'/60'/0'/0/1");
        assert.equal( privKey, '78bd734be30ddcf45b14d07684743fdb391ec5efbe24e83996f2cc46aad9a17e');
    });

    it('can get private key from salted mnemonics', function () {
        const mnemonics = '{"mnemonics": "truck unfair vote open sting airport speak awesome recall end symbol chef siren zoo session claw anchor text chimney mandate lottery turn admit ankle", "salt": ""}';
        const privKey = getPrivKey(mnemonics, "m/44'/60'/0'/0/1");
        assert.equal( privKey, '78bd734be30ddcf45b14d07684743fdb391ec5efbe24e83996f2cc46aad9a17e');
    });

    it('sign transaction', function () {
        const mnemonics = (
            'truck unfair vote open sting airport speak ' +
            'awesome recall end symbol chef siren zoo session ' +
            'claw anchor text chimney mandate lottery turn admit ankle'
        );
        const privKey = getPrivKey(mnemonics, "m/44'/60'/0'/0/1");
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
    })

});
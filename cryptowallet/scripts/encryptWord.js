const cryptoJS = require('crypto-js');
const word = process.argv[2];
const password = 'password';

const iv = cryptoJS.lib.WordArray.random(16);
const anchorPassword = cryptoJS.SHA256(password);
const enc = cryptoJS.AES.encrypt(word, anchorPassword, {iv: iv});
const hash = cryptoJS.SHA256(cryptoJS.enc.Base64.parse(enc.toString()));

const r = {
    iv: iv.toString(),
    enc: enc.toString(),
    pass: anchorPassword.toString(),
    hash: hash.toString()

};

console.log('IV', r.iv);
console.log('Encrypted', r.enc);
console.log('Anchor password', r.pass);
console.log('Hash', r.hash);

console.log('\nTest:\n<', word);
const decrypted = cryptoJS.AES.decrypt(
    {ciphertext: cryptoJS.enc.Base64.parse(r.enc)},
    cryptoJS.enc.Hex.parse(r.pass),
    {iv: cryptoJS.enc.Hex.parse(r.iv)}
);
console.log('>', cryptoJS.enc.Utf8.stringify(decrypted));


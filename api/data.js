/*
Fake api, request field what we get from get request,
response mean what we get when send post request. Actions types:
CW - Create wallet
AW - Attach wallet
CWP - Change wallet password
MT - Make transaction

Available languages ru, en
*/


const normalCreateWalletRu = {
    request: {
        action: 'CW',
        data: {
            lang: 'ru'
        },
    },
    response: {
    },
    description: 'Normal request for create wallet for russian lang'
};

const normalCreateWalletEn = {
    request: {
        action: 'CW',
        data: {
            lang: 'en'
        },
    },
    response: {
    },
    description: 'Normal request for create wallet for ENGLISH lang'
};

const totalNotExistsError = {
    error: {
        'GET': 404,
        'PUT': 404
    },
    description: 'Return on GET and PUT 404 errors'
};

const createWalletAndPutError = {
    request: {
        action: 'CW',
        data: {
            lang: 'en'
        },
    },
    error: {
        'PUT': 400
    },
    description: 'Create wallet and onSave return error'
};

const bitcoinTransactionWithChange = {
    request: {
        action: 'MT',
        data: {
            lang: 'ru',
            inputs: [
                {
                  "prevout_n": 6,
                  "prevout_hash": "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c",
                  "account": 0,
                  "change": 0,
                  "address": 10,
                  "value": 100
                },
                {
                  "prevout_n": 0,
                  "prevout_hash": "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
                  "account": 0,
                  "change": 0,
                  "address": 0,
                  "value": 200
                }
            ],
            coin: 0,
            receiver: {
                address: "19prTTzaBQuLEBTuwYvp4iuYnKg1FL55XG",
                value: 270
            },
            locktime: 0,
            useRBF: true,
            change: {
                value: 10,
                account: 10,
                address: 0
            }
        },
    },
    description: 'Create transaction with change'
};

const bitcoinTransactionWithOutChangeAndWithError = {
    request: {
        action: 'MT',
        data: {
            lang: 'ru',
            inputs: [
                {
                  "prevout_n": 6,
                  "prevout_hash": "Some text",
                  "account": 0,
                  "change": 0,
                  "address": 'aaaa',
                },
                {
                  "prevout_n": 0,
                  "prevout_hash": "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
                  "account": 0,
                  "change": 0,
                  "value": 200
                },
                {
                  "prevout_n": 0,
                  "prevout_hash": "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
                  "account": 0,
                  "change": 0,
                  "address": 0,
                  "value": 200
                }
            ],
            coin: 0,
            receiver: {
                address: "19prTTzaBQuLEBTuwYvp4iuYnKg1FL55XG",
                value: 270
            },
            locktime: 0,
            useRBF: true,
        },
    },
    description: 'Create transaction with out change and with error'
};

const bitcoinTransactionWithoutInputOutput = {
    request: {
        action: 'MT',
        data: {
            lang: 'ru',
            coin: 0,
            locktime: 0,
            useRBF: true,
        },
    },
    description: 'Create transaction with out any input and output'
};

module.exports = {
    '0': normalCreateWalletRu,
    '1': normalCreateWalletEn,
    '2': totalNotExistsError,
    '3': createWalletAndPutError,
    '4': bitcoinTransactionWithChange,
    '5': bitcoinTransactionWithOutChangeAndWithError,
    '6': bitcoinTransactionWithoutInputOutput
};
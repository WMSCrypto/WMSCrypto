/*
Fake api, request field what we get from get request,
response mean what we get when send post request. Actions types:
CW - Create wallet
AW - Attach wallet
CWP - Change wallet password
MT - Make transaction

Available languages ru, en

For using anchor add #wjkdbUXAhe+tUS7EqtTuTw== or #OgXMJ1F6hAN1Qq0IujUSlg== in path.
For using change password with method 8 #wjkdbUXAhe+tUS7EqtTuTw==&OgXMJ1F6hAN1Qq0IujUSlg== in path
Mnemonics for test:
define tell fiction rebel crisp pulse modify length swing build holiday wet vague change dirt present witness fix aware inch brick fancy math pig
*/

// wjkdbUXAhe+tUS7EqtTuTw==
const IV = 'a0c01968a1da2b4a51cd94936b833de0';
const ANCHOR_PASSWORD = '79bfb0e2ba76b9d447606ddbcc494834f05a4c11deb052e74b49ea307a3c5bcd'; //sha256(anchor)
const ANCHOR_HASH = 'c65292f59cd174fbf1ee2d47b865fd6ffff01798d85bec6fa5b72e7c63090168';

// OgXMJ1F6hAN1Qq0IujUSlg==
const NEW_IV = '9e1a5e47950562c045fb20c9a949c724';
const NEW_ANCHOR_PASSWORD = '42f6e0ce671eef6252ef18a23e38bfee47f8325df818908100389eceb09607f9'; //sha256(new_anchor)
const NEW_ANCHOR_HASH = '5c1f29ae22966dfb337f4edf02fd4a3ffb985080363f29fbb617bd8517946d9f';

// 0
const normalCreateWalletRu = {
    request: {
        action: 'CW',
        data: {
            lang: 'ru',
            anchor_password: ANCHOR_PASSWORD,
            anchor_iv: IV,
            anchor_hash: ANCHOR_HASH
        },
    },
    response: {
    },
    description: 'Normal request for create wallet for russian lang'
};

// 1
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

// 2
const totalNotExistsError = {
    error: {
        'GET': 404,
        'PUT': 404
    },
    description: 'Return on GET and PUT 404 errors'
};

// 3
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

// 4
const bitcoinTransactionWithExchange = {
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
                value: 270,
            },
            exchange_info: {
                symbol: 'WMSToken',
                decimal: 5,
                value: 0.3454354334
            },
            locktime: 0,
            useRBF: true,
            change: {
                value: 10,
                account: 10,
                address: 0
            },
            anchor_password: ANCHOR_PASSWORD,
            anchor_iv: IV,
            anchor_hash: ANCHOR_HASH
        },
    },
    response: {
    },
    description: 'Create transaction with exchange'
};

// 5
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

// 6
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

// 7
const ethereumTransactionWithoutErrors = {
    request: {
        action: 'MT',
        data: {
            coin : 60,
            account: 2,
            change: 0,
            address: 3,
            nonce : 15,
            gasPrice : 0,
            gasLimit : 21000,
            to : "0x0038a3882823e533ab3ea28759050b5446b58583",
            value : 10,
            data : ""
        },
    },
    description: 'Ethereum transaction without error'
};

// 8
const changeWalletPassword = {
    request: {
        action: 'CWP',
        data: {
            lang: 'ru',
            anchor_password: ANCHOR_PASSWORD,
            anchor_iv: IV,
            anchor_hash: ANCHOR_HASH,
            new_anchor_password: NEW_ANCHOR_PASSWORD,
            new_anchor_iv: NEW_IV,
            new_anchor_hash: NEW_ANCHOR_HASH,
        },
    },
    response: {
    },
    description: 'Change wallet password'
};

// 9
const attachWalletByMnemonics = {
    request: {
        action: 'AW',
        data: {
            lang: 'en',
            anchor_password: ANCHOR_PASSWORD,
            anchor_iv: IV,
            anchor_hash: ANCHOR_HASH
        },
    },
    response: {
    },
    description: 'Attach wallet using mnemonics'
};

// 10
const normalCreateWalletRuWithCoinsList = {
    request: {
        action: 'CW',
        data: {
            lang: 'ru',
            anchor_password: ANCHOR_PASSWORD,
            anchor_iv: IV,
            anchor_hash: ANCHOR_HASH,
            coins_list: [
                {name: 'Bitcoin', id : 0},
                {name: 'Ethereum', id : 60},
                {name: 'Litecoin', id : 2},
                {name: 'Bitcoin Cash', id : 145},
                {name: 'Bitcoin Gold', id : 156},
                {name: 'ZCash', id : 113},
                {name: 'Expanse', id : 40},
            ]
        },
    },
    response: {
    },
    description: 'Normal request for create wallet for russian lang and send coins list'
};

// 11
const changeWalletPasswordReverse = {
    request: {
        action: 'CWP',
        data: {
            lang: 'ru',
            new_anchor_password: ANCHOR_PASSWORD,
            new_anchor_iv: IV,
            new_anchor_hash: ANCHOR_HASH,
            anchor_password: NEW_ANCHOR_PASSWORD,
            anchor_iv: NEW_IV,
            anchor_hash: NEW_ANCHOR_HASH,
        },
    },
    response: {
    },
    description: 'Change wallet password with reverse action 8'
};

// 12
const ethereumTransactionWithExchangeInfoAndData = {
    request: {
        action: 'MT',
        data: {
            coin : 60,
            account: 2,
            change: 0,
            address: 3,
            nonce : 15,
            gasPrice : 10,
            gasLimit : 21000,
            to : "0x0038a3882823e533ab3ea28759050b5446b58583",
            value : 10.13,
            data : "0xa9059cbb00000000000000000000000050333a327bad0ee064a17a78f47468c02d026bae0000000000000000000000000000000000000000000000000019c7fb954e8a3c",
            exchange_info: {
                symbol: 'WMSToken',
                decimal: 5,
                value: 0.3454354334
            },
        },
    },
    description: 'Ethereum transaction wit exchange info and data'
};

const issue16notOpen = {
    request: {
        action: 'MT',
        data: {
            coin : 60,
            account: 0,
            change: 0,
            address: 0,
            nonce : 18,
            gasPrice : 9000000000,
            gasLimit : 21000,
            to : "0x764c96ed8df6715631c3d6c909b2a8700caeaf24",
            value : 0.02506679200000003,
            data : "",
            exchange_info: {
                symbol: 'WMSToken',
                decimal: 5,
                value: 0.3454354334
            },
        },
    },
    description: 'Ethereum transaction wit exchange info and data'
};

const issue16erc20 = {
    request: {
        action: 'MT',
        data: {
            coin : 60,
            account: 0,
            change: 0,
            address: 0,
            nonce : 18,
            gasPrice : 9000000000,
            gasLimit : 93915,
            to : "0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec",
            value : 0,
            data : "0xa9059cbb00000000000000000000000089d949c297940bf3193f97eb442cb432a06d917b0000000000000000000000000000000000000000000000127c738d0dc0798800",
            token_info: {
                decimals: 18,
                symbol: 'POLY'
            },
            exchange_info: {
                symbol: 'BTC',
                decimal: 8,
                value: 1764049
            },
        },
    },
    description: 'Ethereum transaction wit exchange info and data'
};

module.exports = {
    '0': normalCreateWalletRu,
    '1': normalCreateWalletEn,
    '2': totalNotExistsError,
    '3': createWalletAndPutError,
    '4': bitcoinTransactionWithExchange,
    '5': bitcoinTransactionWithOutChangeAndWithError,
    '6': bitcoinTransactionWithoutInputOutput,
    '7': ethereumTransactionWithoutErrors,
    '8': changeWalletPassword,
    '9': attachWalletByMnemonics,
    '10': normalCreateWalletRuWithCoinsList,
    '11': changeWalletPasswordReverse,
    '12': ethereumTransactionWithExchangeInfoAndData,
    '13': issue16notOpen,
    '14': issue16erc20
};
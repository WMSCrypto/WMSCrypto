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

module.exports = {
    '0': normalCreateWalletRu,
    '1': normalCreateWalletEn,
    '2': totalNotExistsError,
    '3': createWalletAndPutError
};
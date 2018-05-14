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

const normalCreateWalletEn = Object.assign({}, normalCreateWalletRu);
normalCreateWalletEn.request.data.lang = 'en';
normalCreateWalletEn.request.data.description = 'Normal request for create wallet for english lang';

const totalNotExistsError = {
    error: {
        'GET': 404,
        'PUT': 404
    },
    description: 'Return on GET and PUT 404 errors'
};

module.exports = {
    '0': normalCreateWalletRu,
    '1': normalCreateWalletEn,
    '2': totalNotExistsError
};
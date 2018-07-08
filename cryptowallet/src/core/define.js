export default {
    apps: {
        CW: 'CW',
        AW: 'AW',
        CWP: 'CWP',
        MT: 'MT',
        ST: 'ST'
    },
    languages: {
        EN: 'en',
        RU: 'ru'
    },
    steps: {
        createPassword: {
            name: 'createPassword',
            display: 'Create password'
        },
        generateMnemonics: {
            name: 'generateMnemonics',
            display: 'Generate mnemonics'
        },
        generateImage: {
            name: 'generateImage',
            display: 'QR-key'
        },
        askMnemonic: {
            name: 'askMnemonic',
            display: null
        },
        generateXpub: {
            name: 'generateXpub',
            display: 'Generation public keys'
        },
        saveWallets: {
            name: 'saveWallets',
            display: null
        },
        choiceTransactionSource: {
            name: 'choiceTransactionSource',
            display: 'Choice transaction source'
        },
        checkTransaction: {
            name: 'checkTransaction',
        },
        unlockKey: {
            name: 'unlockKey',
            display: 'Unlock key'
        },
        signTransaction: {
            name: 'signTrx',
            display: 'Transaction sign'
        },
        setMnemonics: {
            name: 'setMnemonics',
        },
        saveNewPassword: {
            name: 'saveNewPassword',
        }
    },
    methods: {
        c: 'coin',
        f: 'file',
        r: 'request'
    },
    debug: process.env.NODE_ENV === 'development'
}
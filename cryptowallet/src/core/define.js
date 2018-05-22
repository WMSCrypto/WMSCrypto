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
        }

    },
    debug: process.env.NODE_ENV === 'development'
}
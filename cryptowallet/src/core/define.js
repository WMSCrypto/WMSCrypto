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
            display: 'Generate key'
        },
        askMnemonic: {
            name: 'askMnemonic',
            display: 'Check save mnemonics'
        },
        generateXpub: {
            name: 'generateXpub',
            display: 'Generation wallets'
        },
        saveWallets: {
            name: 'saveWallets',
            display: 'Save wallets'
        }

    },
    debug: process.env.NODE_ENV === 'development'
}
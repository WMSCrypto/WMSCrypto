import { fieldTests, fieldViews, fieldCreator } from "../../../core/fields";

const prevoutHashFieldTest = (v) => fieldTests.hex(v) && v.length === 64;
const prevoutHashInputTest = (v) => fieldTests.hex(v) && v.length <= 64;

const complexWallet = {
    'name': 'Account',
    'view': (props) => fieldViews.walletView({coin: 0, ...props}),
    'test': fieldTests.walletTest
};

const complexWalletChange = {
    'name': 'Account for change',
    'view': (props) => fieldViews.walletView({coin: 0, change: 1, ...props}),
    'test': fieldTests.walletTest
};

const valueTransform = (v) => v !== '' ? Math.round(parseFloat(v) * Math.pow(10, 8)) : '';
const valueInputTest = (v) => /^\d*\.?\d{0,8}$/.test(v);

// export default {
//     'inputs:prevout_n': {
//         name: 'Output ID',
//         def: '',
//         test: fieldTests.integer,
//         transform: (v) => parseInt(v, 10)
//     },
//     'inputs:prevout_hash': {
//         name: 'Previous transaction hash',
//         def: '',
//         test: hexTest,
//         testInput: prevoutHashInputTest
//     },
//     'inputs:account': {
//         name: 'Account',
//         def: 0,
//         test: fieldTests.integer,
//         complex: complexWallet
//     },
//     'inputs:change': {
//         name: 'Change',
//         def: 0,
//         test: fieldTests.oneOrTwo,
//         complex: complexWallet
//     },
//     'inputs:address': {
//         name: 'Address',
//         def: 0,
//         test: fieldTests.integer,
//         complex: complexWallet
//     },
//     'inputs:value': {
//         name: 'Value',
//         def: 0,
//         test: fieldTests.integer,
//         view: fieldViews.valueView,
//         testInput: valueInputTest,
//         transform: valueTransform
//     },
//     'receiver:address': {
//         name: 'Receiver',
//         def: '',
//         test: fieldTests.base58
//     },
//     'receiver:value': {
//         name: 'Value',
//         def: 0,
//         test: fieldTests.integer,
//         view: fieldViews.valueView
//     },
//     'change:value': {
//         name: 'Value',
//         def: 0,
//         test: fieldTests.integer,
//         view: fieldViews.valueView,
//     },
//     'change:account': {
//         name: 'Account',
//         def: 0,
//         test: fieldTests.integer,
//         complex: complexWalletChange,
//     },
//     'change:address': {
//         name: 'Address',
//         def: 0,
//         test: fieldTests.integer,
//         complex: complexWalletChange,
//     },
//     'locktime': {
//         name: 'Locktime',
//         def: 0,
//         test: (v) => fieldTests.integer(v) && v >= 0 && v <= 4294967295
//     },
//     'useRBF': {
//         name: 'Use RBF',
//         def: false,
//         test: fieldTests.bool,
//         view: fieldViews.yesNoView
//     },
// }

export default {
    'inputs:prevout_n': fieldCreator({
        name: 'Output ID',
        def: '',
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
        iTransform: (v) => v !== '' ? parseInt(v, 10) : ''
    }),
    'inputs:prevout_hash': fieldCreator({
        name: 'Previous transaction hash',
        def: '',
        fTest: (v) => fieldTests.hex(v) && v.length === 64,
        iTest: (v) => fieldTests.hex(v) && v.length <= 64
    }),
    'inputs:value': fieldCreator({
        name: 'Value',
        def: '0.00000000',
        fTest: fieldTests.integer,
        iTest: valueInputTest,
        fView: fieldViews.valueView,
        iTransform: valueTransform
    }),
    'inputs:account': fieldCreator({
        name: 'Account',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'inputs:change': fieldCreator({
        name: 'Change',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'inputs:address': fieldCreator({
        name: 'Address',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
}
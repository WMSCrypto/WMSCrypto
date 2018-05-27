import fieldTests from "../../../core/fieldTests";
import fieldViews from "../../../core/fieldViews";

const hexTest = (v) => fieldTests.hex(v) && v.length === 64;
const complexWallet = {
    'name': 'Account',
    'view': (props) => fieldViews.walletView({coin: 0, ...props})
};

const complexWalletChange = {
    'name': 'Account for change',
    'view': (props) => fieldViews.walletView({coin: 0, change: 1, ...props})
};

export default {
    'inputs': {
        name: 'Input'
    },
    'receiver': {
        name: 'Output'
    },
    'change': {
        name: 'Change'
    },
    'inputs:prevout_n': {
        name: 'Output ID',
        def: '',
        test: fieldTests.integer
    },
    'inputs:prevout_hash': {
        name: 'Previous transaction hash',
        def: '',
        test: hexTest
    },
    'inputs:account': {
        name: 'Account',
        def: 0,
        test: fieldTests.integer,
        complex: complexWallet
    },
    'inputs:change': {
        name: 'Change',
        def: 0,
        test: fieldTests.oneOrTwo,
        complex: complexWallet
    },
    'inputs:address': {
        name: 'Address',
        def: 0,
        test: fieldTests.integer,
        complex: complexWallet
    },
    'inputs:value': {
        name: 'Value',
        def: 0,
        test: fieldTests.integer,
        view: fieldViews.valueView
    },
    'receiver:address': {
        name: 'Receiver',
        def: '',
        test: fieldTests.base58
    },
    'receiver:value': {
        name: 'Value',
        def: 0,
        test: fieldTests.integer,
        view: fieldViews.valueView
    },
    'change:value': {
        name: 'Value',
        def: 0,
        test: fieldTests.integer,
        view: fieldViews.valueView,
    },
    'change:account': {
        name: 'Account',
        def: 0,
        test: fieldTests.integer,
        complex: complexWalletChange
    },
    'change:address': {
        name: 'Address',
        def: 0,
        test: fieldTests.integer,
        complex: complexWalletChange
    },
    'locktime': {
        name: 'Locktime',
        def: 0,
        test: (v) => fieldTests.integer(v) && v >= 0 && v <= 4294967295
    },
    'useRBF': {
        name: 'Use RBF',
        def: false,
        test: fieldTests.bool,
        view: fieldViews.yesNoView
    },
}
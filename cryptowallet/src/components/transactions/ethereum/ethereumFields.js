import { fieldTests, fieldCreator } from "../../../core/fields";

export default {
    'account': fieldCreator({
        name: 'Account',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'change': fieldCreator({
        name: 'Change',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'address': fieldCreator({
        name: 'Address',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'nonce': fieldCreator({
        name: 'Nonce',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'gasPrice': fieldCreator({
        name: 'Gas price (wei)',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'gasLimit': fieldCreator({
        name: 'Gas limit',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'to': fieldCreator({
        name: 'To',
        def: '',
        fTest: (v) => v ? /^0x[\da-fA-F]{40}$/.test(v) : false,
        iTest: (v) =>  v ? v === '0' || v === '0x' || /^0x[\da-fA-F]{0,40}$/.test(v) : false
    }),
    'value': fieldCreator({
        name: 'Value (wei)',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'data': fieldCreator({
        name: 'Data',
        def: '',
        fTest: (v) => v === '' || (v ? /^0x[\da-fA-F]+$/.test(v) : false),
        iTest: (v) =>  v ? v === '0' || v === '0x' || /^0x[\da-fA-F]*$/.test(v) : false
    }),
}

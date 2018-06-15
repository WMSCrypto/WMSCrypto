import React from 'react';
import { fieldTests, fieldViews, fieldCreator } from "../../../core/fields";

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
        name: 'Gas price',
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
        fTest: fieldTests.base58,
        iTest: (v) =>  /^[1-9a-km-zA-HJ-NP-Z]*$/.test(v)
    }),
    'value': fieldCreator({
        name: 'Value',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'data': fieldCreator({
        name: 'Data',
        def: '',
    }),
}

import React from 'react';
import { fieldTests, fieldViews, fieldCreator } from "../../../core/fields";
import T from "../../T";

const valueTransform = (v) => v !== '' ? Math.round(parseFloat(v) * Math.pow(10, 8)) : '';
const valueInputTest = (v) => /^\d*\.?\d{0,8}$/.test(v);

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
        name: 'Input value',
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
    'receiver:address': fieldCreator({
        name: 'Receiver',
        def: '',
        fTest: fieldTests.base58,
        iTest: (v) =>  /^[1-9a-km-zA-HJ-NP-Z]*$/.test(v)
    }),
    'receiver:value': fieldCreator({
        name: 'Value',
        def: '0.00000000',
        fTest: fieldTests.integer,
        iTest: valueInputTest,
        fView: fieldViews.valueView,
        iTransform: valueTransform
    }),
    'change:value': fieldCreator({
        name: 'Value',
        def: '0.00000000',
        fTest: fieldTests.integer,
        iTest: valueInputTest,
        fView: fieldViews.valueView,
        iTransform: valueTransform
    }),
    'change:account': fieldCreator({
        name: 'Account',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'change:address': fieldCreator({
        name: 'Address',
        def: 0,
        fTest: fieldTests.integer,
        iTest: fieldTests.integer,
    }),
    'locktime': fieldCreator({
        name: 'Locktime',
        def: 0,
        fTest: (v) => fieldTests.integer(v) && v >= 0 && v <= 4294967295,
        iTest: (v) => fieldTests.integer(v) && v >= 0 && v <= 4294967295
    }),
    'useRBF': fieldCreator({
        name: 'Use RBF',
        def: false,
        fTest: fieldTests.bool,
        iTest: fieldTests.bool,
        fView: (v) => v === true ? <T>Yes</T> : <T>No</T>
    })
}

export {
    valueTransform
}
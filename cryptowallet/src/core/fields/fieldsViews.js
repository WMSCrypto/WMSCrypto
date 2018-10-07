import React from 'react';
import T from "../../components/T";
import {BigNumber} from 'bignumber.js';

const bigTen = new BigNumber(10);
BigNumber.config({ EXPONENTIAL_AT: 64 });

const valueView = (v) => v !== '' ? (Math.pow(10, -8) * v).toFixed(8) : '';

const walletView = ({ purpose=44, coin, account, change, address }) => `m/${purpose}'/${coin}'/${account}'/${change}/${address}`;

const yesNoView = (v) => {
    if (v === true) {
        return <T>Yes</T>
    }
    if (v === false) {
        return <T>No</T>
    }
    return v
};

const bigView = (value, decimals) => {
    return (new BigNumber(value)).multipliedBy(
        bigTen.pow(new BigNumber(decimals).multipliedBy(-1))
    );
}

export default {
    valueView,
    walletView,
    yesNoView,
    bigView
}
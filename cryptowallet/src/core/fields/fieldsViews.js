import React from 'react';
import T from "../../components/T";

const valueView = (v) => v !== '' ? (Math.pow(10, -8) * v) : '';

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

export default {
    valueView,
    walletView,
    yesNoView
}
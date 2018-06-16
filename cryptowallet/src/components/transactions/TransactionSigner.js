import React from 'react';
import define from '../../core/define';
import stepWrapper from "../../core/stepWrapper";
import { flatToData } from "../../core/actions/transactionFormActions";
import bitcoinSigner from "./bitcoin/bitcoinSigner";
import ethereumSigner from "./ethereum/ethereumSigner";

const signers = {
    0: bitcoinSigner,
    60: ethereumSigner
};

export default stepWrapper(define.steps.signTransaction)(
    (props) => {
        const { getStepResult } = props;
        const seed = getStepResult(define.steps.unlockKey);
        const trxData = getStepResult(define.steps.checkTransaction);
        const source = getStepResult(define.steps.choiceTransactionSource);
        const isManual = source && source.method === define.methods.c;
        const coin = isManual ? source.data : trxData.coin;
        const data = isManual ? flatToData(trxData, coin) : trxData;
        return <p>{signers[coin](seed, data)}</p>
    }
)
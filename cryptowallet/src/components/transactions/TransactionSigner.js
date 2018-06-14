import React from 'react';
import define from '../../core/define';
import stepWrapper from "../../core/stepWrapper";
import { flatToData } from "../../core/actions/transactionFormActions";
import bitcoinSigner from "./bitcoin/bitcoinSigner";

const signers = {
    0: bitcoinSigner
};

export default stepWrapper(define.steps.signTransaction)(
    (props) => {
        const { getStepResult } = props;
        const seed = getStepResult(define.steps.unlockKey);
        const source = getStepResult(define.steps.choiceTransactionSource);
        const coin = source.method === define.methods.c ? source.data : source.data.coin;
        const flatData = getStepResult(define.steps.checkTransaction);
        const data = flatToData(flatData, coin);
        return <p>{signers[coin](seed, data)}</p>
    }
)
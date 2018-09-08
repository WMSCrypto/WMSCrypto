import React from 'react';
import define from '../../core/define';
import stepWrapper from "../../core/stepWrapper";
import { flatToData } from "../../core/actions/transactionFormActions";
import bitcoinSigner from "./bitcoin/bitcoinSigner";
import ethereumSigner from "./ethereum/ethereumSigner";
import PreviousButton from "../buttons/PreviousButton";
import T from "../T";
import DownloadButton from "../buttons/DownloadButton";

const signers = {
    0: bitcoinSigner,
    60: ethereumSigner
};

const _onSave = ({ setResult, uuid, steps, saveOperationResult, transaction }) => {
    setResult(true);
    saveOperationResult(uuid, transaction)
};

export default stepWrapper(define.steps.signTransaction)(
    (props) => {
        const { getStepResult, previousStep, online } = props;
        const seed = getStepResult(define.steps.unlockKey);
        const trxData = getStepResult(define.steps.checkTransaction);
        const source = getStepResult(define.steps.choiceTransactionSource);
        const isManual = source && source.method === define.methods.c;
        const coin = isManual ? source.data : trxData.coin;
        const data = isManual ? flatToData(trxData, coin) : trxData;
        const transaction = {...data, signed: signers[coin](seed, data)};
        return (
            <div>
                <p>{transaction.signed}</p>
                <div className="Step_controls">
                    <PreviousButton onClick={() => previousStep()}/>
                    {online
                        ? <button type="button"
                                  className="btn btn-primary"
                                  onClick={() => _onSave({...props, transaction})}>
                            <T>Send</T>
                          </button>
                        : <DownloadButton id="downloadTransaction" obj={transaction}>
                            <T>Download</T>
                          </DownloadButton>
                    }
                </div>

            </div>
        )
    }
)
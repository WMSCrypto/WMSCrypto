import React, { Component } from 'react';
import signers from '../utils/signers';
import Card from "./Cards/Card";
import DownloadButton from "./DownloadButton";
import {t} from "../utils/translate";
import {sendPut} from "../utils";

const WITH_PREFIX = [60];
const WITH_RAW = [60];

const Raw = ({ raw }) => {
    if (!raw) {
        return null
    }
    return (
        <div>
            <p><small className="text-muted">Raw transaction data</small><br/>
                {JSON.stringify(raw)}
            </p>
        </div>
    )
};

class TxSigner extends Component {

    render() {
        const { mnemonics, transaction, transactionSaved, coin, uuid, onOperationResult } = this.props;
        if (!(mnemonics && transaction &&transactionSaved)) {
            return null
        }
        const signed = signers[coin](mnemonics, transaction);
        let data = {};
        if (WITH_PREFIX.indexOf(coin) === -1) {
            data.signed = `${signed}`
        } else {
            data.signed = `0x${signed}`
        }
        if (WITH_RAW.indexOf(coin) !== -1) {
            data.raw= transaction
        }
        return(
            <Card>
                <Raw raw={data.raw}/>
                <div>
                    <p>
                    <small className="text-muted">Transaction signature</small><br/>
                        {data.signed}
                    </p>
                </div>
                <DownloadButton title={t("Download transaction data")}
                                obj={data}
                                id="downloadTransaction"/>
                <br/>
                {uuid
                    ? <button className="btn btn-danger"
                        onClick={() => {sendPut(
                            uuid,
                            data,
                            onOperationResult
                        )}}>
                    Send transaction
                    </button>
                    : null
                }
            </Card>
        )
    }
}

export default TxSigner
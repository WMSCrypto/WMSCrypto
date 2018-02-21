import React, { Component } from 'react';
import signers from '../utils/signers';
import Card from "./Cards/Card";
import DownloadButton from "./DownloadButton";
import {t} from "../utils/translate";
import {sendPut} from "../utils";

class TxSigner extends Component {

    render() {
        const { mnemonics, transaction, transactionSaved, coin, uuid, onOperationResult } = this.props;
        if (!(mnemonics && transaction &&transactionSaved)) {
            return null
        }

        const signed = signers[coin](mnemonics, transaction);
        const data = {raw: transaction, signed: `0x${signed}`};
        return(
            <Card>
                <div>
                    <p>
                    <small className="text-muted">Raw transaction data</small><br/>
                        {JSON.stringify(transaction)}
                    </p>
                </div>
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
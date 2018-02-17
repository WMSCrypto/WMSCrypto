import React, { Component } from 'react';
import signers from '../utils/signers';
import Card from "./Cards/Card";
import DownloadButton from "./DownloadButton";
import {t} from "../utils/translate";
import {sendPut} from "../utils";

class TxSigner extends Component {

    render() {
        const { address, mnemonics, txData, addressData, uuid, onOperationResult } = this.props;
        if (!(mnemonics && txData && address)) {
            return null
        }

        const signed = signers[addressData.coin](mnemonics, address, txData);
        const raw = {txParams: txData, ...addressData};
        const data = {raw: raw, signed: `0x${signed}`};
        return(
            <Card>
                <div>
                    <p>
                    <small className="text-muted">Raw transaction data</small><br/>
                        {JSON.stringify(raw)}
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
                <button className="btn btn-danger"
                        onClick={() => {sendPut(
                            uuid,
                            data,
                            onOperationResult
                        )}} disabled={!uuid}>
                    Send transaction
                </button>
            </Card>
        )
    }
};

export default TxSigner
import React, { Component } from 'react';
import signers from '../utils/signers';
import Card from "./Card";

class TxSigner extends Component {

    render() {
        const { address, mnemonics, txData, coin } = this.props;
        if (!(mnemonics && txData && address)) {
            return null
        }

        const signed = signers[coin](mnemonics, address, txData);
        return(
            <Card>
                <div>
                    <p>
                    <small className="text-muted">Raw transaction data</small><br/>
                        {JSON.stringify(txData)}
                    </p>
                </div>
                <div>
                    <p>
                    <small className="text-muted">Transaction signature</small><br/>
                        0x{signed}
                    </p>
                </div>
            </Card>
        )
    }
};

export default TxSigner
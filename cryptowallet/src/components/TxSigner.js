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
                <div>{JSON.stringify(txData)}</div>
                <div>{signed}</div>
            </Card>
        )
    }
};

export default TxSigner
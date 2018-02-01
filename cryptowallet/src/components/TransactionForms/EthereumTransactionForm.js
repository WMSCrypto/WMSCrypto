import React, { Component } from 'react';
import Card from "../Card";


class EthereumTransactionFrom extends Component {

    render() {
        if (parseInt(this.props.coin) !== 60) {
            return null
        }

        return(
            <div>
                <Card>
                    <p>Ethereum transaction form</p>
                    <div className="form-group">
                        <label htmlFor="inputNonce">Nonce</label>
                        <input type="text"
                               className="form-control"
                               id="inputNonce"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputGasPrice">Gas price</label>
                        <input type="text"
                               className="form-control"
                               id="inputGasPrice"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputGasLimit">Gas limit</label>
                        <input type="text"
                               className="form-control"
                               id="inputGasLimit"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputTo">To, 0x</label>
                        <input type="text"
                               className="form-control"
                               id="inputTo"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputValue">Value</label>
                        <input type="text"
                               className="form-control"
                               id="inputValue"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputData">Data, 0x</label>
                        <textarea className="form-control"
                                  id="inputData"
                                  rows={4}/>
                    </div>
                </Card>
            </div>
        )
    }
}

export default EthereumTransactionFrom;
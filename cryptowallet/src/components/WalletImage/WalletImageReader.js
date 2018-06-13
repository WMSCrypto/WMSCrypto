import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-reader';
import WalletImageLocker from "./WalletImageLocker";
import define from '../../core/define';
import stepWrapper from "../../core/stepWrapper";
import T from "../T";

const REF_QR = 'qrReader';

class WalletImageReader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encryptedString: null,
            error: null
        };
        this.handleScan = this.handleScan.bind(this);
        this.openImageDialog = this.openImageDialog.bind(this);
    }

    handleScan(result) {
        if (result) {
            this.setState({encryptedString: result, error: null})
        } else {
            this.setState({
                encryptedString: null,
                error: true
            })
        }
    }

    openImageDialog() {
        this.refs[REF_QR].openImageDialog()
    }

    render() {
        const { encryptedString, error } = this.state;
        const { setResult, getStepResult } = this.props;
        const seed = getStepResult(define.steps.unlockKey);
        return (
            <React.Fragment>
                <WalletImageLocker seed={seed}
                                   encryptedString={encryptedString}
                                   onUnlock={setResult}/>
                <QrReader ref={REF_QR}
                          legacyMode={true}
                          onScan={this.handleScan}
                          onError={(error) => {}}
                          style={{ display: 'none', width: '100%' }}/>
                {!seed
                    ? <button className="btn btn-outline-primary"
                              onClick={this.openImageDialog}><T>Upload QR-key</T></button>
                    : null
                }
                {error ? <span className="text-danger"> <T>QR code cannot be readied</T></span> : null}
            </React.Fragment>
        )
    }
}

WalletImageReader.propTypes = {
    seed: PropTypes.string
};

export default stepWrapper(define.steps.unlockKey)(WalletImageReader);
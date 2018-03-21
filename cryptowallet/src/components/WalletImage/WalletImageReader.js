import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from "../Cards/Card";
import QrReader from 'react-qr-reader';
import WalletImageLocker from "./WalletImageLocker";
import { t } from "../../utils/translate";

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
        const { onUnlock, seed } = this.props;
        return (
            <React.Fragment>
                <Card>
                    <WalletImageLocker seed={seed}
                                       encryptedString={encryptedString}
                                       onUnlock={onUnlock}/>
                    <QrReader ref={REF_QR}
                              legacyMode={true}
                              onScan={this.handleScan}
                              onError={(error) => {}}
                              style={{ display: 'none', width: '100%' }}/>
                    {!seed
                        ? <button className="btn btn-outline-primary"
                                  onClick={this.openImageDialog}>{t("Upload QR-key")}</button>
                        : null
                    }
                    {error ? <span className="text-danger"> {t("QR code cannot be readied")}</span> : null}
                </Card>
            </React.Fragment>
        )
    }
}

WalletImageReader.propTypes = {
    onUnlock: PropTypes.func.isRequired,
    seed: PropTypes.string
};

export default WalletImageReader
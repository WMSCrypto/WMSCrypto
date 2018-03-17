import React, { Component } from 'react';
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
            rawImage: null,
            error: null
        };
        this.handleScan = this.handleScan.bind(this);
        this.openImageDialog = this.openImageDialog.bind(this);
    }

    handleScan(result) {
        if (result) {
            const rawImage = this.refs[REF_QR].reader.result;
            this.setState({encryptedString: result, rawImage, error: null})
        } else {
            this.setState({
                encryptedString: null,
                rawImage: null,
                error: t("QR code cannot be readied")
            })
        }
    }

    openImageDialog() {
        this.refs[REF_QR].openImageDialog()
    }

    render() {
        const { rawImage, encryptedString, error } = this.state;
        const { onUnlock, seed } = this.props;
        return (
            <Card>
                <WalletImageLocker rawImage={rawImage}
                                   encryptedString={encryptedString}
                                   onUnlock={onUnlock}/>
                <QrReader ref={REF_QR}
                          legacyMode={true}
                          onScan={this.handleScan}
                          onError={(error) => {}}
                          style={{ display: 'none', width: '100%' }}/>
                {!seed 
                    ? <button className="btn btn-outline-primary"
                              onClick={this.openImageDialog}>{t("Upload image")}</button>
                    : null
                }
                {error ? <span className="text-danger"> {error}</span> : null}
            </Card>
        )
    }
}

export default WalletImageReader
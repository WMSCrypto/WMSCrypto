import React from 'react';
import PropTypes from 'prop-types';
import Card from "../Cards/Card";
import QRCode from 'qrcode-svg';
import backgroudCanvas from "../../assets/backgroudCanvas";
import { getIdenticonSVG } from "../../utils/jdenticon";


class WalletImageGenerator extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const { imageBack, imageIdenticon, imageQr } = this.refs;

        imageBack.onload = () => {
            ctx.drawImage(imageBack, 0, 0)
        };

        imageIdenticon.onload = () => {
            ctx.drawImage(imageIdenticon, 20, 170)
        };

        imageQr.onload = () => {
            ctx.drawImage(imageQr, 430, 170)
        };
    }

    render() {
        const { seed } = this.props;
        const identicon = window.btoa(getIdenticonSVG({seed: seed.hex}));
        const qrcode = new QRCode({content: seed.encrypted, width: 400, height: 400, padding: 4}).svg();
        return(
            <Card>
                <canvas ref="canvas" width={850} height={600} style={{width: '100%'}}/>
                <img alt="Something wrong" ref="imageBack" src={backgroudCanvas} style={{display: 'none'}} />
                <img alt="Something wrong" ref="imageIdenticon" src={`data:image/svg+xml;base64,${identicon}`} style={{display: 'none'}} />
                <img alt="Something wrong" ref="imageQr" src={`data:image/svg+xml;base64,${window.btoa(qrcode)}`} style={{display: 'none'}} />
            </Card>
        )
    }
}

WalletImageGenerator.propTypes = {
    seed: PropTypes.shape({
        hex: PropTypes.string.isRequired,
        encrypted: PropTypes.string.isRequired,
    }).isRequired
};

export default WalletImageGenerator;
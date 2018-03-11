import React from 'react';
import Card from "./Cards/Card";
import QRCode from 'qrcode-svg';
import Identicon from "../elements/IdenticonView";
import backgroudCanvas from "../assets/backgroudCanvas";
import {getIdenticonSVG} from "../utils/jdenticon";
import sha256 from "crypto-js/sha256";


class GeneratedImage extends React.Component {

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
    const qrcode = new QRCode({content: seed.encrypted, width: 400, height: 400, padding: 2}).svg();
    console.log(seed)
    return(
      <Card>
        <canvas ref="canvas" width={850} height={600} style={{width: '100%'}}/>
        <img ref="imageBack" src={backgroudCanvas} style={{display: 'none'}} />
        <img ref="imageIdenticon" src={`data:image/svg+xml;base64,${identicon}`} style={{display: 'none'}} />
        <img ref="imageQr" src={`data:image/svg+xml;base64,${window.btoa(qrcode)}`} style={{display: 'none'}} />
      </Card>
    )
  }
}

export default GeneratedImage;
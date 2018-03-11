import React from 'react';
import Card from "./Cards/Card";
import QRCode from 'qrcode-svg';
import Identicon from "../elements/IdenticonView";
import backgroudCanvas from "../assets/backgroudCanvas";
import {getIdenticonSVG} from "../utils/jdenticon";
import sha256 from "crypto-js/sha256";

function downloadCanvas(link, canvasElem, filename) {
  console.log(link, canvasElem)
    link.href = canvasElem.toDataURL();
    link.download = filename;
}

class GeneratedImage extends React.Component {

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img1 = this.refs.image1
    const img2 = this.refs.image2
    const img3 = this.refs.image3

    img1.onload = () => {
      ctx.drawImage(img1, 0, 0)
    };

    img2.onload = () => {
      ctx.drawImage(img2, 20, 170)
    };

    img3.onload = () => {
      ctx.drawImage(img3, 430, 170)
    };


  }

  render() {
    const qrcode = new QRCode({content: 'aaaa', width: 400, height: 400, padding: 2}).svg();
    return(
      <div>
        <canvas ref="canvas" width={850} height={600} />
        <img ref="image1" src={backgroudCanvas} style={{display: 'none'}} />
        <img ref="image2" src={`data:image/svg+xml;base64,${window.btoa(getIdenticonSVG({seed: 'some'}))}`} style={{display: 'none'}} />
        <img ref="image3" src={`data:image/svg+xml;base64,${window.btoa(qrcode)}`} style={{display: 'none'}} />
        <a ref="downloadBtn" onClick={() => downloadCanvas(this.refs.downloadBtn, this.refs.canvas, 'some.png')}>Ololo</a>
      </div>
    )
  }
}

export default GeneratedImage;
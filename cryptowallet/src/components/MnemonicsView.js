import React from 'react';
import sha256 from 'crypto-js/sha256';

const saveMnemonics = (obj) => {
        const chatBlob = new Blob([JSON.stringify(obj)], {type : 'text/plain;charset=utf-8'});
        const downloadBtn = document.getElementById("saveMnemonics");
        downloadBtn.href = URL.createObjectURL(chatBlob);
        downloadBtn.download = `${sha256(obj.encryptedMnemonics).toString()}.json`;
};

const MnemonicsView = (props) => {
    const { mnemonics, bits, anchor, encryptedMnemonics } = props;
    return (
        <div>
            {mnemonics &&
                <small className="text-muted">
                    {`Generated mnemonics to ${bits}-bits entropy`}
                </small>
            }
            <p className="lead">{mnemonics}</p>
            <small className="text-muted">
                {`Encrypted using anchor: ${anchor}`}
            </small>
            <p className="hashString">
                {encryptedMnemonics && encryptedMnemonics.toString()}
            </p>

            <a href="javascript:void(0)" id="saveMnemonics">
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => saveMnemonics({
                encryptedMnemonics: encryptedMnemonics.toString(), version: '0.1'
            })}>Download encrypted mnemonics</button>
            </a>
        </div>
    )
};

export default MnemonicsView;

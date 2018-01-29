import React from 'react';
import DownloadButton from "./DownloadButton";

const MnemonicsView = (props) => {
    const { mnemonics, bits, encryptedMnemonics } = props;
    return (
        <div>
            {mnemonics &&
                <small className="text-muted">
                    {`Generated mnemonics to ${bits}-bits entropy`}
                </small>
            }
            <p className="lead">{mnemonics}</p>
            <DownloadButton title="Download encrypted mnemonics"
                            id="saveMnemonics"
                            obj={{
                                encryptedMnemonics: encryptedMnemonics.toString(), version: '0.1'
                            }}/>
        </div>
    )
};

export default MnemonicsView;

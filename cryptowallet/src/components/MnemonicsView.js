import React from 'react';

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
        </div>
    )
};

export default MnemonicsView;

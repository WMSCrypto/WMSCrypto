import React from 'react';

const MnemonicsView = (props) => {
    return (
        <div>
            <br/>
            {props.mnemonics &&
                <small className="text-muted">
                    {`Generated mnemonics to ${props.bits}-bits entropy`}
                </small>
            }
            <p className="lead">{props.mnemonics}</p>
        </div>
    )
};

export default MnemonicsView;

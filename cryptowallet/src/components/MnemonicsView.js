import React from 'react';
import { t } from '../utils/translate';
import { MNEMONICS_BITS } from "../utils";

const MnemonicsView = ({ mnemonics }) => {
    return (
        <div>
            <small className="text-muted">
                {t(`Generated mnemonics to ${MNEMONICS_BITS}-bits entropy`)}
            </small>
            <p className="lead">{mnemonics}</p>
        </div>
    )
};

export default MnemonicsView;

import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';
import { dropLocation } from '../../utils';


const SomethingWrongResult = () => {
    return (
        <ResultCard title={t("SORRY")}>
            <a href="tg://resolve?domain=WMSCryptoBot">
                <button className="btn btn-danger" onClick={dropLocation}>
                    {t('Return to telegram')}
                </button>
            </a>
        </ResultCard>
    )
};

export default SomethingWrongResult;
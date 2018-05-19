import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';

const InvalidUUIDCard = () => {
    return (
        <ResultCard title={t("INVALID_UUID")}>
            <a href="tg://resolve?domain=WMSCryptoBot">
                <button className="btn btn-danger">
                    {t('Return to telegram')}
                </button>
            </a>
        </ResultCard>
    )
};

export default InvalidUUIDCard;
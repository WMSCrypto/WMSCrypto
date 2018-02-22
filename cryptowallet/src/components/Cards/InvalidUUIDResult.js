import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';
import { dropLocation } from '../../utils';


const InvalidUUIDCard = () => {
    return (
        <ResultCard title={t("INVALID_UUID")}>
            <button className="btn btn-danger" onClick={dropLocation}>
                {t('Reload in offline mode')}
            </button>
        </ResultCard>
    )
};

export default InvalidUUIDCard;
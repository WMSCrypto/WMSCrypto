import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';
import { dropLocation } from '../../utils';


const SuccessResult = () => {
    return (
        <ResultCard title={t("Operation successful")}>
            <button className="btn btn-primary" onClick={dropLocation}>
                    {t('Go to telegram')}
            </button>
        </ResultCard>
    )
};

export default SuccessResult;
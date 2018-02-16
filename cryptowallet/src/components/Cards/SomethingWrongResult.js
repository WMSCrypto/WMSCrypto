import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';
import { dropLocation } from '../../utils';


const SomethingWrongResult = () => {
    return (
        <ResultCard title={t("SORRY")}>
            <button className="btn btn-danger" onClick={dropLocation}>
                    {t('Reload in offline mode')}
            </button>
        </ResultCard>
    )
};

export default SomethingWrongResult;
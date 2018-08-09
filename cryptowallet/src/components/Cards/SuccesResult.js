import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';
import {dropLocation, TG_LINK} from '../../utils';


const SuccessResult = () => {
    return (
        <ResultCard title={t("Operation successful")}>
            <a href={TG_LINK}>
                <button className="btn btn-primary" onClick={dropLocation}>
                    {t('Go to telegram')}
                </button>
            </a>
        </ResultCard>
    )
};

export default SuccessResult;
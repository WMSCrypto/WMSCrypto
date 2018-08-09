import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';
import {TG_LINK} from "../../utils";

const InvalidUUIDCard = () => {
    return (
        <ResultCard title={t("INVALID_UUID")}>
            <a href={TG_LINK}>
                <button className="btn btn-danger">
                    {t('Return to telegram')}
                </button>
            </a>
        </ResultCard>
    )
};

export default InvalidUUIDCard;
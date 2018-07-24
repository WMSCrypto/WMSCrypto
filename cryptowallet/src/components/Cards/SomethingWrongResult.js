import React from 'react';
import ResultCard from "./ResultCard";
import { t } from '../../utils/translate';
import {TG_LINK} from "../../utils";

const SomethingWrongResult = () => {
    return (
        <ResultCard title={t("SORRY")}>
            <a href={TG_LINK}>
                <button className="btn btn-danger">
                    {t('Return to telegram')}
                </button>
            </a>
        </ResultCard>
    )
};

export default SomethingWrongResult;
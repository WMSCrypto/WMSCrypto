import React from 'react';
import { t } from "../utils/translate";

const LanguageMenu = (props) => {
    const { lang, onClick } = props;
    return (
        <div className="LanguageMenu">
            <div><span>{t('Switch language to')}:</span></div>
            <div className="LangLabel">
                <button type="button"
                        className="btn btn-secondary btn-lg"
                        onClick={onClick}>
                    {lang === 'en' ? 'RUS' : 'ENG'}
                </button>
            </div>
        </div>
    )
};

export default LanguageMenu;
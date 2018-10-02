import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeLanguage, changeApp } from "../core/actions/commonActions";
import { reloadApplication } from "../core/actions/stepsActions";
import define from '../core/define';
import AppVersion from "./information/AppVersion";
import T from "./T";

const SHOW_LANG_MENU = true;
const { EN, RU } = define.languages;

const mapStateToProps = (state) => {
    const { lang, application, uuid, result, error } = state.common;
    return {
        lang,
        application,
        uuid,
        result,
        error
    }
};

const mapPropsToDispatch = (dispatch) => {
    return {
        goToMainMenu: () => {
            dispatch(changeApp(null))
        },
        changeLanguage: (lang) => {
            dispatch(changeLanguage(lang))
        },
        reloadApplication: () => {
            dispatch(reloadApplication())
        },
    }
};

const Header = ({ application, uuid, lang, goToMainMenu, reloadApplication, changeLanguage, result, error }) => {
    const newLang = lang === EN ? RU : EN;
    const showRestart = !(result || error) && application;
    return (
        <div className="AppHeader">
            <div>
                <h1>WMSCrypto</h1>
                <AppVersion/>
            </div>
            <div className="HeaderMenu">
                {SHOW_LANG_MENU
                    ?   <button type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => changeLanguage(newLang)}>
                                {lang === EN ? 'RUS' : 'ENG'}
                        </button>
                    : null}
                {showRestart
                    ?   <button type="button"
                                className="btn btn-danger btn-sm"
                                onClick={reloadApplication}>
                        <T>Restart</T>
                        </button>
                    : null}
                {application && !uuid
                    ?   <button type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={goToMainMenu}>
                        <T>Menu</T>
                        </button>
                    : null}
            </div>
        </div>

    )
};

Header.propTypes = {
    application: PropTypes.string,
    uuid: PropTypes.string,
    lang: PropTypes.string.isRequired,
    goToMainMenu: PropTypes.func.isRequired,
    reloadApplication: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapPropsToDispatch)(Header);
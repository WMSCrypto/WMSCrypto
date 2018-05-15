import actionTypes from "../actionTypes";

const changeLanguage = (lang) => {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        lang: lang
    }
};

const changeApp = (app) => {
    return {
        type: actionTypes.SET_APP,
        application: app
    }
};

export {
    changeLanguage,
    changeApp
}


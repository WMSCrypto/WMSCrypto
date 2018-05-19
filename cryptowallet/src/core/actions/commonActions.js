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

const setGlobalLock = (lock) => {
    return {
        type: actionTypes.SET_GLOBAL_LOCK,
        lock
    }
};

export {
    changeLanguage,
    changeApp,
    setGlobalLock
}


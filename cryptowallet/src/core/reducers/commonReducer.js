import actionTypes from '../actionTypes';
import { getUUID, cryptoCheck } from "../../utils";
import { setLang } from "../../utils/translate";

const initialState = {
    lang: 'en',
    application: null,
    data: null,
    uuid: getUUID(),
    check: cryptoCheck(),
    error: null,
    anchor: null,
    seed: null,
    globalLock: false,
    result: null
};

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE:
            const { lang } = action;
            setLang(lang);
            return {...state, lang};
        case actionTypes.SET_DATA:
            const { data, application, anchor, newAnchor } = action;
            return {
                ...state,
                data,
                anchor,
                newAnchor,
                application
            };
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.SET_RESULT:
            return {
                ...state,
                result: action.result
            };
        case actionTypes.SET_APP:
            return {
                ...state,
                application: action.application
            };
        case actionTypes.SET_GLOBAL_LOCK:
            return {
                ...state,
                globalLock: action.lock
            };
        default:
            return state
    }
}
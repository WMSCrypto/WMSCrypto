import actionTypes from "../actionTypes";
import CryptoJS from 'crypto-js';
import { fetchOperation, updateOperation } from "../requests";
import { getAnchor } from "../../utils";
import { changeLanguage } from "./commonActions";

const decryptAnchor = ({ anchor_hash, anchor_password, anchor_iv, anchor }) => {
    const anchorB64 = CryptoJS.enc.Base64.parse(anchor);
    const anchorHash = CryptoJS.SHA256(anchorB64).toString();
    if (anchorHash !== anchor_hash) {
        throw {code: 400};
    } else {
        const iv = CryptoJS.enc.Hex.parse(anchor_iv);
        const passwordWA = CryptoJS.enc.Hex.parse(anchor_password);
        const decrypted = CryptoJS.AES.decrypt({ciphertext: anchorB64}, passwordWA, {iv});
        if (decrypted === '') {
            throw {code: 400};
        } else {
            return decrypted
        }
    }
};

const _getOperationActions = (dispatch) => {
    const onSuccess = (result) => {
        let anchor = getAnchor();
        if (anchor && result.data.anchor_hash) {
            anchor = decryptAnchor({...result.data, anchor})
        }
        dispatch({
            type: actionTypes.SET_DATA,
            data: result.data,
            application: result.action,
            anchor,
        });
        if (result.data.lang) {
            dispatch(changeLanguage(result.data.lang))
        }
    };
    const onError = (error) => {
        dispatch({
            type: actionTypes.SET_ERROR,
            error
        })
    };
    return [onSuccess, onError]
};

const _saveOperationResultActions = (dispatch) => {
    const onSuccess = (result) => {
        dispatch({
            type: actionTypes.SET_RESULT,
            result: result
        });
    };
    const onError = (error) => {
        dispatch({
            type: actionTypes.SET_ERROR,
            error
        })
    };
    return [onSuccess, onError]
};

const getOperation = (uuid) => {
    return dispatch => {
        const [onSuccess, onError] = _getOperationActions(dispatch);
        fetchOperation(uuid, onSuccess, onError)
    }
};

const saveOperationResult = (uuid, data) => {
    return dispatch => {
        const [onSuccess, onError] = _saveOperationResultActions(dispatch);
        updateOperation(uuid, data, onSuccess, onError)
    }
};

export {
    getOperation,
    saveOperationResult,
    decryptAnchor
}
import actionTypes from "../actionTypes";
import CryptoJS from 'crypto-js';
import { fetchOperation, updateOperation } from "../requests";
import { getAnchor } from "../../utils";
import { changeLanguage } from "./commonActions";
import { tryDecrypt } from "../crypto";

const decryptAnchor = ({ anchor_hash, anchor_password, anchor_iv, encAnchor }) => {
    const anchorHash = CryptoJS.SHA256(encAnchor).toString();
    if (anchorHash !== anchor_hash) {
        throw 400;
    } else {
        const [error, decrypted] = tryDecrypt(() => {
            const iv = CryptoJS.enc.Hex.parse(anchor_iv);
            return CryptoJS.AES.decrypt(encAnchor, anchor_password, {iv})
        });
        if (error !== null) {
            throw 400;
        } else {
            return decrypted
        }
    }
};

const _getOperationActions = (dispatch) => {
    const onSuccess = (result) => {
        const encAnchor = getAnchor();
        let anchor = null;
        if (encAnchor) {
            anchor = decryptAnchor({...result.data, encAnchor})
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
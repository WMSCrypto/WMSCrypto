import actionTypes from "../actionTypes";
import CryptoJS from 'crypto-js';
import { fetchOperation, updateOperation } from "../requests";
import { getAnchor } from "../../utils";
import { changeLanguage } from "./commonActions";

const decryptAnchor = ({ anchor_hash, anchor_password, anchor_iv, anchor }) => {
    const anchorB64 = CryptoJS.enc.Base64.parse(anchor);
    const anchorHash = CryptoJS.SHA256(anchorB64).toString();
    if (anchorHash !== anchor_hash) {
        throw Error('400 Hash incorrect');
    } else {
        const iv = CryptoJS.enc.Hex.parse(anchor_iv);
        const passwordWA = CryptoJS.enc.Hex.parse(anchor_password);
        const decrypted = CryptoJS.AES.decrypt({ciphertext: anchorB64}, passwordWA, {iv});
        if (decrypted === '') {
            throw Error('400 Password or iv incorrect');
        } else {
            return decrypted
        }
    }
};

const decryptAnchorsList = (arr, data) => {
    let anchor = null;
    let newAnchor = null;
    if (data.anchor_hash) {
        anchor = decryptAnchor({...data, anchor: arr[0]});
    }
    if (arr.length === 2 && data.new_anchor_hash) {
        newAnchor = decryptAnchor({
            anchor_hash: data.new_anchor_hash,
            anchor_password: data.anchor_password,
            anchor_iv: data.anchor_iv,
            anchor: arr[1]
        });
    }
    return [anchor, newAnchor];
};

const _getOperationActions = (dispatch) => {
    const onSuccess = (result) => {
        let anchor = getAnchor();
        let newAnchor = null;
        const anchorsList = anchor && anchor.split('&');
        if (anchorsList) {
            [anchor, newAnchor] = decryptAnchorsList(anchorsList, result.data)
        }
        dispatch({
            type: actionTypes.SET_DATA,
            data: result.data,
            application: result.action,
            anchor,
            newAnchor,
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
import actionTypes from "../actionTypes";
import { fetchOperation, updateOperation } from "../requests";
import { changeLanguage } from "./commonActions";

const _getOperationActions = (dispatch) => {
    const onSuccess = (result) => {
        dispatch({
            type: actionTypes.SET_DATA,
            data: result.data,
            application: result.action
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
    saveOperationResult
}
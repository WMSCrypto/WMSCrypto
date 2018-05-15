import actionTypes from "../actionTypes";
import { fetchOperation } from "../requests";
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

const getOperation = (uuid) => {
    return dispatch => {
        const [onSuccess, onError] = _getOperationActions(dispatch);
        fetchOperation(uuid, onSuccess, onError)
    }
};

export {
    getOperation
}
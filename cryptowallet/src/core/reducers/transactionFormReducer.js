import actionTypes from "../actionTypes";

const getInitialState = () => {
    return {
        flatData: {},
        rawData: {},
        errors: null,
        valid: false,
        coin: null,
        fill: false
    }
};

export default (state=getInitialState(), action) => {
    switch (action.type) {
        case actionTypes.FILL_TRANSACTION_FORM:
            const { flatData, rawData, errors, valid, coin } = action;
            return { flatData, rawData, errors, valid, coin, fill: true };
        case actionTypes.DROP_CURRENT_APP:
            return getInitialState();
        case actionTypes.SET_APP:
            return getInitialState();
        default:
            return state
    }
}

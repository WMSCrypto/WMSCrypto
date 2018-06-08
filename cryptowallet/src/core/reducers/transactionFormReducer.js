import actionTypes from "../actionTypes";

const getInitialState = () => {
    return {
        data: {},
        errors: null,
        valid: false,
        validation: {},
        fieldsValues: {},
        coin: null,
        fill: false
    }
};

export default (state=getInitialState(), action) => {
    switch (action.type) {
        case actionTypes.FILL_TRANSACTION_FORM:
            const { data, errors, valid, coin } = action;
            return {
                data,
                errors,
                valid,
                coin,
                validation: action.validation,
                fieldsValues: action.fieldsValues,
                fill: true
            };
        case actionTypes.SET_TRANSACTION_FORM:
            const { validation, fieldsValues } = state;
            const { flatKey } = action;
            validation[flatKey] = action.valid;
            fieldsValues[flatKey] = action.value;
            return {
                ...state,
                validation: {...validation},
                fieldsValues: {...fieldsValues}
            };
        case actionTypes.DROP_CURRENT_APP:
            return getInitialState();
        case actionTypes.SET_APP:
            return getInitialState();
        default:
            return state
    }
}

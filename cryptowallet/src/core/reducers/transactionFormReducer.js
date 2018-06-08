import actionTypes from "../actionTypes";

const getInitialState = () => {
    return {
        data: {},
        errors: null,
        valid: false,
        validation: [],
        fieldsValues: {},
        coin: null,
        fill: false
    }
};

export default (state=getInitialState(), action) => {
    const { validation, fieldsValues } = state;
    switch (action.type) {
        case actionTypes.FILL_TRANSACTION_FORM:
            const { data, errors, valid, coin } = action;
            return { data, errors, valid, validation, coin, fieldsValues, fill: true };
        case actionTypes.SET_TRANSACTION_FORM:
            const { flatKey } = action;
            validation[flatKey] = action.valid;
            fieldsValues[flatKey] = action.value;
            console.log('fieldsValues', fieldsValues)
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

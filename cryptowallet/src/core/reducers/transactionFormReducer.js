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

const deleteFormGroup = ({ validation, fieldsValues, data, groupName, index}) => {
    const lenKey = groupName.length;
    let allKeys = Object.keys(fieldsValues).filter(i => i.slice(0, lenKey) === groupName);
    if (index !== null) {
        // If field is array we don't want delete this field, because this is huge logic,
        // we just mark it's as null and not render and not using.
        allKeys = allKeys.filter(i => parseInt(i.split('#')[1], 10) === index);
        data[groupName][index] = null
    } else {
        delete data[groupName]
    }
    allKeys.forEach(k => {
        delete validation[k];
        delete fieldsValues[k];
    });
    return {
        data: {...data},
        validation: {...validation},
        fieldsValues: {...fieldsValues}
    }
};

export default (state=getInitialState(), action) => {
    const { validation, fieldsValues } = state;
    switch (action.type) {
        case actionTypes.FILL_TRANSACTION_FORM:
            const { data, errors, valid, coin } = action;
            return {
                data,
                errors,
                valid,
                coin,
                validation: { ...action.validation, ...validation},
                fieldsValues: {...action.fieldsValues, ...fieldsValues},
                fill: true
            };
        case actionTypes.SET_TRANSACTION_FORM:
            const { flatKey } = action;
            validation[flatKey] = action.valid;
            fieldsValues[flatKey] = action.value;
            return {
                ...state,
                validation: {...validation},
                fieldsValues: {...fieldsValues}
            };
        case actionTypes.DEL_TRANSACTION_FORM_GROUP:
            const delResult = deleteFormGroup({...state, ...action});
            return {
                ...state,
                ...delResult,
            };
        case actionTypes.DROP_CURRENT_APP:
            return getInitialState();
        case actionTypes.SET_APP:
            return getInitialState();
        default:
            return state
    }
}

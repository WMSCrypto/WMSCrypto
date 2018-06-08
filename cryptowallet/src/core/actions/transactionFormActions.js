import actionTypes from "../actionTypes";
import coinTo from "../../components/transactions/coinTo";

const handledData = (obj, coin) => {
    const fields = coinTo[obj.coin].fields;
    const keys = Object.keys(obj);
    const validation = {};
    const fieldsValues = {};
    const update = (fk, vk, v) => {
        const f = fields[fk];
        if (f) {
            validation[vk] = f.test.field(v);
            fieldsValues[vk] = v;
        }
    };
    keys.forEach((k) => {
        const current = obj[k];
        if (Array.isArray(current)) {
            current.forEach((v, i) => {
                // If we have array key is parentName:#elementIndex:fieldName
                Object.keys(v).forEach((ck) => {
                    update(`${k}:${ck}`, `${k}:${ck}:#${i}`, current[i][ck]);
                })
            })
        } else if (typeof current === 'object' && current !== null) {
            // Key is "parentName:fieldName"
            Object.keys(current).forEach((ck) => {
                update(`${k}:${ck}`, `${k}:${ck}`, current[ck]);
            })
        } else {
            update(k, k, current);
        }
    });

    return {
        valid: Object.values(validation).reduce((p, c) => p && c, true),
        validation,
        fieldsValues
    }
};

const fillForm = (data) => {
    return dispatch => {
        const fillResult = handledData(data);
        const errors = coinTo[data.coin].errors(data);
        dispatch({
            type: actionTypes.FILL_TRANSACTION_FORM,
            data,
            errors,
            coin: data.coin,
            ...fillResult
        });
        dispatch({
            type: actionTypes.SET_STEP_RESULT,
            result: (fillResult.valid && errors.valid) ? data : false
        });
    };
};

const setForm = ({ value, coinField, flatKey }) => {
    return dispatch => {
        const transformed = coinField.transform.input(value);
        console.log('Transformed', transformed)
        const valid = coinField.test.field(transformed);
        dispatch({
            type: actionTypes.SET_TRANSACTION_FORM,
            flatKey,
            valid,
            value
        });
        dispatch({
            type: actionTypes.SET_STEP_RESULT,
            result: valid
        });
    }
};

export {
    fillForm,
    setForm
}
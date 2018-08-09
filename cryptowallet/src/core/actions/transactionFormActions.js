import actionTypes from "../actionTypes";
import coinTo from "../../components/transactions/coinTo";

const checkTrueValues = (obj) => Object.values(obj).reduce((p, c) => p && c, true);

const flatToData = (obj, coin) => {
    let data = {};
    const fields = coinTo[coin].fields;
    Object.keys(obj).forEach(k => {
        const keys = k.split(':');
        const value = obj[k];
        let parent, child, index;
        switch (keys.length) {
            case 1:
                data[k] =fields[k].transform.input(value);
                break;
            case 2:
                [parent, child] = keys;
                if (data[parent] === undefined) {
                    data[parent] = {}
                }
                data[parent][child] = fields[k].transform.input(value);
                break;
            case 3:
                [parent, child, index] = keys;
                index = parseInt(index.slice(1), 10);
                if (data[parent] === undefined) {
                    data[parent] = []
                }

                if (data[parent].length <= index) {
                    data[parent].push({})
                }
                data[parent][index][child] = fields[`${parent}:${child}`].transform.input(value);
                break;
            default:
                break;
        }
    });
    return data;
};

const handledData = (obj) => {
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
                // If we have array key is parentName:fieldName:#elementIndex
                if (v !== null) {
                    Object.keys(v).forEach((ck) => {
                        update(`${k}:${ck}`, `${k}:${ck}:#${i}`, current[i][ck]);
                    })
                }
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
        valid: checkTrueValues(validation),
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

const setForm = ({ value, coinField, flatKey, validation, fieldsValues  }) => {
    return dispatch => {
        const transformed = coinField.transform.input(value);
        const valid = coinField.test.field(transformed);
        validation[flatKey] = valid;
        dispatch({
            type: actionTypes.SET_TRANSACTION_FORM,
            flatKey,
            valid,
            value
        });
        dispatch({
            type: actionTypes.SET_STEP_RESULT,
            result: checkTrueValues(validation) ? fieldsValues : false
        });
    }
};

const deleteFormGroup = ({ groupName, index=null }) => {
    return dispatch => {
        dispatch({
            type: actionTypes.DEL_TRANSACTION_FORM_GROUP,
            groupName,
            index
        })
    }
};


export {
    fillForm,
    setForm,
    deleteFormGroup,
    flatToData
}
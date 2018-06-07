import bitcoinFields from "../../components/transactions/bitcoin/bitcoinFields";
import bitcoinErrors from "../../components/transactions/bitcoin/bitcoinErrors";
import actionTypes from "../actionTypes";

const coinIdToFields = {
    0: bitcoinFields
};

const coinIdToErrors = {
    0: bitcoinErrors
};

const createField = (v, field) => {
    return {
        'value': v,
        'valid': field.test ? field.test(v) === true : false,
        'view': field && field.view ? field.view(v) : v,
        'viewFunc': field.view,
        'test': field.test,
        'testInput': field.testInput,
        'transform': field.transform,
        'name': field.name
    }
};

const getResultStore = (fields) => {
    const result = {};
    return {
        set: ({ n=null, pName=null, name, value }) => {
                const fieldName = pName ? `${pName}:${name}` : name;
                if (fields[fieldName]) {
                    const key = n !== null ? `#${n}:${fieldName}` : fieldName;
                    result[key] = createField(value, fields[fieldName]);
                }
            },
        get: () => {
            return result
        }
    }
};


const objectToFlat = (obj, resultStore) => {
    /* In this function we can prepare javascript object to flat object.
    Why i need do this? Because in this form more simple using in forms, i can check if total form just using
    check values and update or get form value, just pass one key. Example:
    Input:
    {
        "key1": {
            "child1": "value1"
            "child2": "value2"
        },
        "key2": "value3",
        "key3": [
            {
                "child4": "value4"
                "child5": "value5"
            },
            {
                "child4": "value6"
                "child5": "value7"
            }
        ]
    }
    Output:
    {
        "key1:child1": "value1",
        "key1:child2": "value2",
        "key2": "value3",
        "#0:key3:child4": "value4",
        "#0:key3:child5": "value5",
        "#1:key3:child4": "value6",
        "#1:key3:child5": "value6",
    }
    */
    const keys = Object.keys(obj);
    keys.forEach((k) => {
        const current = obj[k];
        if (Array.isArray(current)) {
            current.forEach((v, i) => {
                // If we have array key is #elementIndex:parentName:fieldName
                Object.keys(v).forEach((ck) => {
                    resultStore.set({n: i, pName: k, name: ck, value: current[i][ck]})
                })
            })
        } else if (typeof current === 'object' && current !== null) {
            // Key is "parentName:fieldName"
            Object.keys(current).forEach((ck) => {
                resultStore.set({pName: k, name: ck, value: current[ck]})
            })
        } else {
            // Key just name
            resultStore.set({value: current, name: k})
        }
    });
    return resultStore.get()

};

const getResult = (obj) => {
    const fields = coinIdToFields[obj.coin];
    if (fields) {
        const resultStore = getResultStore(fields);
        return objectToFlat(obj, resultStore)
    } else {
        return {}
    }
};

const getValidationError = (obj) => {
    return Object.values(obj).reduce((p, c) => p && c.valid, true)
};

const fillForm = (data) => {
    return dispatch => {
        const flatData = getResult(data);
        const valid = getValidationError(flatData);
        const errors = coinIdToErrors[data.coin](data);
        dispatch({
            type: actionTypes.FILL_TRANSACTION_FORM,
            coin: data.coin,
            rawData: data,
            flatData,
            valid,
            errors
        });
        dispatch({
            type: actionTypes.SET_STEP_RESULT,
            result: (valid && errors.valid) ? data : false
        });
    };
};

const updateData = (flatKey, flatData, rawData, field, value) => {
    const f = flatData[flatKey];
    flatData[flatKey] = {
        ...f,
        value: value,
        valid: f.test ? f.test(value) === true : false,
        view: f && f.viewFunc ? f.viewFunc(value) : value,

    };
    if (flatKey[0] === '#') {
        // Pattern #0:key1:key2
        const [index, key1, key2] = flatKey.split(':');
        rawData[key1][index.slice(1)][key2] = value;
    } else {
        const keys = flatKey.split(':');
        if (keys.length === 1) {
            // Pattern key1
            rawData[flatKey] = value;
        }

        if (keys.length === 2) {
            // Pattern key1:key2
            rawData[keys[0]][keys[1]] = value
        }
    }
    return [flatData, rawData]
};

const setForm = ({ value, flatKey, flatData, rawData, strict, coin }) => {
    return dispatch => {
        let field = flatData[flatKey];
        const empty = value === '';
        const newValue = !empty && field.transform ? field.transform(value) : value;
        let update = true;
        if (strict && (field.test || field.testInput)) {
            console.log(value, newValue)
            const testFunc = field.testInput || field.test;
            update = empty || testFunc(newValue);
        }

        if (update) {
            const [ newFlatData, newRawData ] = updateData(
                flatKey, flatData, rawData, field, newValue
            );
            const valid = getValidationError(flatData);
            dispatch({
                type: actionTypes.SET_TRANSACTION_FORM,
                flatData: newFlatData,
                rawData: newRawData,
                valid,
            });
            dispatch({
                type: actionTypes.SET_STEP_RESULT,
                result: valid
            });

        }
    }
};

export {
    fillForm,
    setForm
}
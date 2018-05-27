import bitcoinFields from "../../components/transactions/bitcoin/bitcoinFields";
import actionTypes from "../actionTypes";

const coinIdToFields = {
    0: bitcoinFields
};

const createField = (v, field) => {
    return {
        'value': v,
        'valid': field.test(v) === true,
        'name': field.name,
        'view': field.view ? field.view(v) : null
    }
};

const getResultStore = (fields) => {
    const resultSequence = {};
    const result = {};
    return {
        set: ({ n=null, pName=null, name, value }) => {
                const fieldName = pName ? `${pName}:${name}` : name;
                if (fields[fieldName]) {
                    const key = n !== null ? `#${n}:${fieldName}` : fieldName;
                    result[key] = createField(value, fields[fieldName]);
                    // If we have n is index of element in array, we store all indexes in object by parent name
                    // {"parentKey": [0, 0, 0, 1, 1, 1]. I final just get unique and sort.
                    if (n !== null) {
                        if (!resultSequence[pName]) {
                            resultSequence[pName] = []
                        } else {
                            resultSequence[pName].push(n)
                        }
                    }
                }
            },
        get: () => {
            Object.keys(resultSequence).forEach(k => {
                resultSequence[k] = resultSequence[k].filter((v, i, a) => a.indexOf(v) === i).sort()
            });
            return [result, resultSequence]
        }
    }
};


const objectToFlat = (obj, resultStore) => {
    /* In this function we can prepare javascript object to flat object and save sequence fo array,
    if present. Why i need do this? Because in this form more simple using in forms, i can check if total form just using
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
    }, {"key3": [0, 1]}
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
        return [{}, {}]
    }
};

const flatToObject = (obj, fields) => {

};

const getInitialState = () => {
    return {
        dataForm: {},
        error: null,
        sequence: {},
        coin: null,
        fill: false
    }
};

export default (state=getInitialState(), action) => {
    switch (action.type) {
        case actionTypes.FILL_TRANSACTION_FORM:
            const { data } = action;
            const [ dataForm, sequence ] = getResult(data);
            return {
                dataForm,
                sequence,
                coin: data.coin,
                fill: true
            };
        case actionTypes.DROP_CURRENT_APP:
            return getInitialState();
        case actionTypes.SET_APP:
            return getInitialState();
        default:
            return state
    }
}

import bitcoinFields from "../../components/transactions/bitcoin/bitcoinFields";
import actionTypes from "../actionTypes";

const coinIdToFields = {
    0: bitcoinFields
};

const createField = (v, field) => {
    return {
        'value': v,
        'valid': field.test(v),
        'name': field.name
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
    const keys = Object.keys(obj);
    keys.forEach((k) => {
        const current = obj[k];
        if (Array.isArray(current)) {
            current.forEach((v, i) => {
                Object.keys(v).forEach((ck) => {
                    resultStore.set({n: i, pName: k, name: ck, value: current[i][ck]})
                })
            })
        } else if (typeof current === 'object' && current !== null) {
            Object.keys(current).forEach((ck) => {
                resultStore.set({pName: k, name: ck, value: current[ck]})
            })
        } else {
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

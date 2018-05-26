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
    const result = {};
    return {
        set: ({ n=null, pName=null, name, value }) => {
                const fieldName = pName ? `${pName}:${name}` : name;
                if (fields[fieldName]) {
                    const key = n !== null ? `#${n}:${fieldName}` : fieldName;
                    result[key] = createField(value, fields[fieldName])
                }
        },
        get: () => result
    }
};


const objectToFlat = (obj, fields) => {
    const resultStore = getResultStore(fields);
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

const flatToObject = (obj, fields) => {

};

const getInitialState = () => {
    return {
        dataForm: {},
        error: null
    }
};

export default (state=getInitialState(), action) => {
    switch (action.type) {
        case actionTypes.FILL_TRANSACTION_FORM:
            const { data } = action;
            const fields = coinIdToFields[data.coin];
            let dataForm;
            if (fields) {
                dataForm = objectToFlat(data, fields)
            } else {
                dataForm = {}
            }
            return {
                dataForm,
                coin: data.coin
            };
        case actionTypes.DROP_CURRENT_APP:
            return getInitialState();
        case actionTypes.SET_APP:
            return getInitialState();
        default:
            return state
    }
}

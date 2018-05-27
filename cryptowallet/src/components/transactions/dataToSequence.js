import bitcoinFieldsSequence from "../../components/transactions/bitcoin/bitcoinFieldsSequence";
import bitcoinFields from "./bitcoin/bitcoinFields";

const coinToSequence = {
    0: bitcoinFieldsSequence
};

const coinToFields = {
    0: bitcoinFields
};

const pushToResult = (dataForm, result, key, name, num, field) => {
    const data = dataForm[key];
    const required = !data && !field['notRequired'];
    if (field.complex) {
        const lastResult = result[result.length - 1];
        const item = { key, name, required };
        if (lastResult && lastResult.name === field.complex.name) {
            lastResult.items.push(item)
        } else {
            result.push({...field.complex, num, items: [item]})
        }
    } else {
        if (required) {
            result.push({name: field.name, err: 'Required field'})
        } else {
            result.push(key)
        }
    }
};

export default ({ dataForm, sequence, coin }) => {
    /* This need for control sequence of elements, we store base sequence for form.
    If element of base is string we just push it to array, else we think is object and get parentName,
    when check if name in sequence get from reducer we just iterate on this array and push element using
    #index:parentName:fieldName. Else we just push parentName:fieldName. And we can get parents names, for show parts of
    for with header. Example:
    Input:
        dataForm: {
            "key1:child1": "value1",
            "key1:child2": "value2",
            "key2": "value3",
            "#0:key3:child4": "value4",
            "#0:key3:child5": "value5",
            "#1:key3:child4": "value6",
            "#1:key3:child5": "value6",
        }
        sequence: {
            "key3": [0, 1]
        }
        coin sequence: [
            "key2",
            {"key3: ["child5", "child4"]},
            {"key1": ["child1", "child2"]}
        ]
        fields: [
            "key3": {
                "name": "name3"
            }
            "key1": {
                "name": "name1"
            }
        ]
    Output: [
        "key2",
        {"name": "name3", "num": 0}
        "#0:key3:child5",
        "#0:key3:child4",
        {"name": "name3", "num": 1}
        "#1:key3:child5",
        "#1:key3:child4",
        {"name": "name1", "num": null}
        "key1:child1",
        "key1:child2",
    ]
    */
    const seq = coinToSequence[coin];
    const fields = coinToFields[coin];
    if (seq) {
        const result = [];
        seq.forEach(s => {
            if (typeof s === 'string') {
                pushToResult(dataForm, result, s, null, '-', fields[s]);
            } else {
                const key = Object.keys(s)[0];
                const parent = fields[key];
                if (sequence[key]) {
                    sequence[key].forEach(i => {
                        if (parent) {
                            result.push({name: parent.name, num: i})
                        }
                        s[key].forEach(v => {
                            pushToResult(dataForm, result, `#${i}:${key}:${v}`, v, i, fields[`${key}:${v}`]);
                        })
                    })
                } else {
                    if (parent) {
                        result.push({name: parent.name, num: null})
                    }
                    s[key].forEach(v => {
                        pushToResult(dataForm, result, `${key}:${v}`, v, '-', fields[`${key}:${v}`]);
                    })
                }
            }
        });
        return result;
    } else {
        return []
    }
};
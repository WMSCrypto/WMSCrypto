import bitcoinFieldsSequence from "../../components/transactions/bitcoin/bitcoinFieldsSequence";
import bitcoinFields from "./bitcoin/bitcoinFields";

const coinToSequence = {
    0: bitcoinFieldsSequence
};

const coinToFields = {
    0: bitcoinFields
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
                result.push(s)
            } else {
                const key = Object.keys(s)[0];
                const parentName = fields[key];
                if (sequence[key]) {
                    sequence[key].forEach(i => {
                        if (parentName) {
                            result.push({name: parentName.name, num: i})
                        }
                        s[key].forEach(v => {
                            result.push(`#${i}:${key}:${v}`)
                        })
                    })
                } else {
                    if (parentName) {
                        result.push({name: parentName.name, num: null})
                    }
                    s[key].forEach(v => {
                        result.push(`${key}:${v}`)
                    })
                }
            }
        });
        return result;
    } else {
        return []
    }
};
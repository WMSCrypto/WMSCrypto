import bitcoinFieldsSequence from "../../components/transactions/bitcoin/bitcoinFieldsSequence";

const coinToSequence = {
    0: bitcoinFieldsSequence
};

export default ({ dataForm, sequence, coin }) => {
    const seq = coinToSequence[coin];
    if (seq) {
        const result = [];
        seq.forEach(s => {
            if (typeof s === 'string') {
                result.push(s)
            } else {
                const key = Object.keys(s)[0];
                if (sequence[key]) {
                    sequence[key].forEach(i => {
                        s[key].forEach(v => {
                            result.push(`#${i}:${key}:${v}`)
                        })
                    })
                } else {
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
import bitcoinErrors from "./bitcoin/bitcoinErrors";
import bitcoinFields from "./bitcoin/bitcoinFields";
import ethereumFields from "./ethereum/ethereumFields";

export default {
    0: {
        errors: bitcoinErrors,
        fields: bitcoinFields,
        name: 'Bitcoin '
    },
    60: {
        errors: () => ({ALL: []}),
        fields: ethereumFields,
        name: 'Ethereum '
    }
}
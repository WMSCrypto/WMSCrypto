import { getOperationDataHandlers } from "./handlers";

const API_ENDPOINT = process.env.API_ENDPOINT || '';

const _prepareResult = response => {
    if (response.status === 200) {
        return response.json()
    } else {
        return response.status
    }
};

const getOperation = (uuid, component) => {
    const [onSuccess, onError] = getOperationDataHandlers(component);
    fetch(`${API_ENDPOINT}/api/operations/${uuid}`)
    .then(_prepareResult)
    .then(result => {
        if (typeof result === 'number') {
            onError(result)
        } else {
            onSuccess(result)
        }
    })
    .catch(err => {
        console.log(err);
        onError(err);
    })
};

const updateOperation = (uuid, data) => {

};

export {
    getOperation,
    updateOperation
}
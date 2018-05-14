const API_ENDPOINT = process.env.API_ENDPOINT || '';

const _prepareResult = response => {
    if (response.status === 200) {
        return [response.json(), null]
    } else {
        return [null, response.status]
    }
};

const getOperation = (uuid, onSuccess, onError) => {
    fetch(`${API_ENDPOINT}/api/operations/${uuid}`)
    .then(_prepareResult)
    .then((response, error) => {
        if (error) { onError(error) }
        else { onSuccess(data) }
    })
    .catch(err => {
        console.log(err);
        onError(err);
    })
};

const updateOperation = (uuid, data, onSuccess, onError) => {

};

export {
    getOperation,
    updateOperation
}
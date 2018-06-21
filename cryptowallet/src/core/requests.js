const API_ENDPOINT = process.env.API_ENDPOINT || '';

const _prepareResult = response => {
    if (response.status === 200) {
        return response.json()
    } else {
        return response.status
    }
};

const fetchOperation = (uuid, onSuccess, onError) => {
    fetch(`${API_ENDPOINT}/api/operations/${uuid}`)
        .then(_prepareResult)
        .then(result => {
            if (typeof result === 'number') {
                onError({code: result})
            } else {
                onSuccess(result)
            }
        })
        .catch(err => {
            console.log(err);
            onError(err);
        })
};

const updateOperation = (uuid, data, onSuccess, onError) => {
    fetch(`${API_ENDPOINT}/api/operations/${uuid}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data})
        })
        .then(_prepareResult)
        .then(result => {
            if (typeof result === 'number') {
                onError({code: result})
            } else {
                onSuccess(result)
            }
        })
        .catch(err => {
            console.log(err);
            onError(err);
        })
};

export {
    fetchOperation,
    updateOperation
}
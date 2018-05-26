import actionTypes from "../actionTypes";

const fillForm = (data) => {
    return {
        type: actionTypes.FILL_TRANSACTION_FORM,
        data
    }
};

export {
    fillForm
}
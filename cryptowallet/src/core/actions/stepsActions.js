import actionTypes from "../actionTypes";


const addStep = ({ name, initialData, first, last, previous, data, controls, result }) => {
    return {
        type: actionTypes.ADD_STEP,
        step: {
            next: null,
            name, initialData, first, last, previous, data, controls, result
        }
    }
};

const nextStep = (next) => {
    return {
        type: actionTypes.NEXT_STEP,
        next
    }
};

const previousStep = () => {
    return {
        type: actionTypes.PREVIOUS_STEP
    }
};

const reloadApplication = () => {
    return {
        type: actionTypes.DROP_CURRENT_APP
    }
};


export {
    addStep,
    nextStep,
    previousStep,
    reloadApplication
}
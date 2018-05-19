import actionTypes from "../actionTypes";


const addStep = (name) => {
    return {
        type: actionTypes.ADD_STEP,
        name: name,
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

const setCurrentStepResult = (result) => {
    return {
        type: actionTypes.SET_STEP_RESULT,
        result,
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
    reloadApplication,
    setCurrentStepResult
}
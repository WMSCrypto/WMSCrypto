/*
If we find self step as last from array we render self.
All component when update props check if last step have next attr true we update
state and add self to steps. If when update we find in self step previous attr true
we self pop from steps.
When we drop current application state, for first step we drop data and other steps delete.
All steps must have next structure:
{
}
*/

import actionTypes from "../actionTypes";

const getInitialState = () => {
    return {
        components: {},
        current: null,
        count: 0,
        stepNumber: 0,
    }
};

export default (state=getInitialState(), action) => {
    switch (action.type) {
        case actionTypes.PREVIOUS_STEP:
            const previous = state.components[state.current].previous;
            return {
                ...state,
                current: previous,
                stepNumber: state.stepNumber - 1
            };
        case actionTypes.NEXT_STEP:
            if (!state.components[action.next]) {
                state.components[action.next] = {
                    result: null,
                    previous: state.current
                };
            }
            return {
                ...state,
                current: action.next,
                stepNumber: state.stepNumber + 1
            };
        case actionTypes.SET_STEP_RESULT:
            state.components[state.current].result = action.result;
            return {
                ...state,
            };
        case actionTypes.SET_STEPS_COUNT:
            return {
                ...state,
                count: action.count
            };
        case actionTypes.DROP_CURRENT_APP:
            const newState = getInitialState();
            return {
                ...newState,
                count: state.count,
            };
        case actionTypes.SET_APP:
            return getInitialState();
        default:
            return state
    }
}

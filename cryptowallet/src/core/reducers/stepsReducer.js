/*
If we find self step as last from array we render self.
All component when update props check if last step have next attr true we update
state and add self to steps. If when update we find in self step previous attr true
we self pop from steps.
When we drop current application state, for first step we drop data and other steps delete.
All steps must have next structure:
{
    name: string (required),
    first: bool (default false),
    last: bool (default false),
    previous: string (default null),
    next: string (default null),
    initialData: object (required),
    data: object (default initialData),
    controls: bool (default true),
}
*/

import actionTypes from "../actionTypes";

const initialState = {
    list: [],
    results: {},
    indexes: {},
    current: null
};

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.PREVIOUS_STEP:
            const results = {...state.results};
            const lastIndex = state.list.length - 1;
            const current = state.list[lastIndex - 1].name;
            results[state.list[lastIndex].name] = null;
            return {
                ...state,
                list: state.list.slice(0, -1),
                results: results,
                current: current
            };
        case actionTypes.NEXT_STEP:
            const index = state.indexes[state.current];
            if (index !== undefined) {
                state.list[index].next = action.next
            }
            return {
                ...state,
                current: action.next
            };
        case actionTypes.ADD_STEP:
            const { list, indexes }  = state;
            const { name } = action.step;
            indexes[name] = list.length;
            return {
                ...state,
                list: [...list, action.step],
                current: action.step.name,
                indexes: indexes
            };
        case actionTypes.DROP_CURRENT_APP:
            const step = {...state.list.slice(0, 1)[0]};
            step.data = {...step.initialData};
            step.next = false;
            step.result = null;
            return {
                ...state,
                list: [step],
                results: {},
                current: step.name
            };
        case actionTypes.SET_STEP_RESULT:
            const res = {...state.results};
            res[state.current] = action.result;
            return {
                ...state,
                results: res
            };
        case actionTypes.SET_APP:
            return initialState;
        default:
            return state
    }
}

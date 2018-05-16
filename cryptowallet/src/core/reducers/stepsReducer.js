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
    result: any (default null)
}
*/

import actionTypes from "../actionTypes";

const initialState = {
    steps: []
};

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.PREVIOUS_STEP:
            return {steps: state.steps.slice(0, -1)};
        case actionTypes.NEXT_STEP:
            return {
                steps: [...state.steps, action.step],
            };
        case actionTypes.DROP_CURRENT_APP:
            const step = {...state.slice(0, 1)[0]};
            step.data = {...step.initialData};
            step.next = false;
            return {
                steps: [step],
            };
        default:
            return state
    }
}

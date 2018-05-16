import { combineReducers } from 'redux'
import commonReducer from './commonReducer';
import stepsReducer from './stepsReducer';

export default combineReducers({
    common: commonReducer,
    steps: stepsReducer
})
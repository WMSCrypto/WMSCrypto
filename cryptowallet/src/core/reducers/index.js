import { combineReducers } from 'redux'
import commonReducer from './commonReducer';
import stepsReducer from './stepsReducer';
import transactionFormReducer from './transactionFormReducer';

export default combineReducers({
    common: commonReducer,
    steps: stepsReducer,
    trx: transactionFormReducer
})
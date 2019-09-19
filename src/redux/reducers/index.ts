import { combineReducers } from "redux";
import accounts from './accountsReducer';
import mainAccount from './mainAccountReducer';

const reducers = combineReducers({
    accounts,
    mainAccount
})

export default reducers;
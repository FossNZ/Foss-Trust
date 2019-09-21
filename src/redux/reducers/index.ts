import { combineReducers } from "redux";
import accounts from './accountsReducer';
import mainAccount from './mainAccountReducer';
import balances from './balancesReducer';

const reducers = combineReducers({
    accounts,
    mainAccount,
    balances
})

export default reducers;
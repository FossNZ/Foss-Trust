import { combineReducers } from "redux";
import accounts from './accountsReducer';
import mainAccount from './mainAccountReducer';
import balances from './balancesReducer';
import beneficiaries from './beneficiariesReducer';

const reducers = combineReducers({
    accounts,
    mainAccount,
    balances,
    beneficiaries
})

export default reducers;
import { combineReducers } from "redux";
import accounts from './accountsReducer';
import mainAccount from './mainAccountReducer';
import balances from './balancesReducer';
import beneficiaries from './beneficiariesReducer';
import condition from './conditionReducer';

const reducers = combineReducers({
    accounts,
    mainAccount,
    balances,
    beneficiaries,
    condition
})

export default reducers;
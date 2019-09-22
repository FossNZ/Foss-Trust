import { combineReducers } from "redux";
import accounts from './accountsReducer';
import mainAccount from './mainAccountReducer';
import balances from './balancesReducer';
import beneficiaries from './beneficiariesReducer';
import condition from './conditionReducer';
import grantor from './grantorReducer';
import grantorBalances from './grantorBalancesReducer';

const reducers = combineReducers({
    accounts,
    mainAccount,
    balances,
    beneficiaries,
    condition,
    grantor,
    grantorBalances
})

export default reducers;
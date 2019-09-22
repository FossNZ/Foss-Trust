import { combineReducers } from "redux";
import accounts from './accountsReducer';
import mainAccount from './mainAccountReducer';
import balances from './balancesReducer';
import beneficiaries from './beneficiariesReducer';
import condition from './conditionReducer';
import grantor from './grantorReducer';
import grantorBalances from './grantorBalancesReducer';
import grantorBeneficiaries from './grantorBeneficiariesReducer';
import grantorCondition from './grantorConditionReducer';
import blockHeight from './blockHeightReducer';

const reducers = combineReducers({
    accounts,
    mainAccount,
    balances,
    beneficiaries,
    condition,
    grantor,
    grantorBalances,
    grantorBeneficiaries,
    grantorCondition,
    blockHeight
})

export default reducers;
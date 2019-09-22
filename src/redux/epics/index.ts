import {combineEpics} from 'redux-observable';
import accountEpic from './accountEpic';
import balanceEpic from './balanceEpic';
import initSignerEpic from './initEpic';
import beneficiariesEpic from './beneficiariesEpic';
import conditionEpic from './conditionEpic';
import grantorBalanceEpic from './grantorBalanceEpic';
import withDrawEpic from './withDrawEpic';
import grantorBeneficiariesEpic from './grantorBeneficiariesEpic';

const epics: any[] = [
    accountEpic,
    balanceEpic,
    initSignerEpic,
    beneficiariesEpic,
    conditionEpic,
    grantorBalanceEpic,
    withDrawEpic,
    grantorBeneficiariesEpic
]

const rootEpics = (...args: any[]) => combineEpics(...epics)(...args);

export default rootEpics;
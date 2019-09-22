import {combineEpics} from 'redux-observable';
import accountEpic from './accountEpic';
import balanceEpic from './balanceEpic';
import initSignerEpic from './initEpic';
import beneficiariesEpic from './beneficiariesEpic';
import conditionEpic from './conditionEpic';

const epics: any[] = [
    accountEpic,
    balanceEpic,
    initSignerEpic,
    beneficiariesEpic,
    conditionEpic
]

const rootEpics = (...args: any[]) => combineEpics(...epics)(...args);

export default rootEpics;
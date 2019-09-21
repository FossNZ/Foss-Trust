import {combineEpics} from 'redux-observable';
import accountEpic from './accountEpic';
import balanceEpic from './balanceEpic';
import initSignerEpic from './initEpic';
import beneficiariesEpic from './beneficiariesEpic';

const epics: any[] = [
    accountEpic,
    balanceEpic,
    initSignerEpic,
    beneficiariesEpic
]

const rootEpics = (...args: any[]) => combineEpics(...epics)(...args);

export default rootEpics;
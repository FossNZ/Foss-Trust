import {combineEpics} from 'redux-observable';
import accountEpic from './accountEpic';

const epics: any[] = [
    accountEpic
]

const rootEpics = (...args: any[]) => combineEpics(...epics)(...args);

export default rootEpics;
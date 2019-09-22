import { ofType, ActionsObservable, StateObservable, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { Observable, combineLatest, of, EMPTY } from 'rxjs';
import actions from '../actions';
import { EpicDependencies } from '../store';
import { State } from '../../types/state';

export type Condition = {
  value: any,
  typeId: number
}

  const fetchGrantorConditionEpic = (
    action$: ActionsObservable<any>,
    state$: StateObservable<State>,
    {api$}: EpicDependencies
    ): Observable<AnyAction> =>
      combineLatest([
          api$,
          action$.pipe(ofType(actions.FETCH_GRANTOR_CONDITION))
      ]).pipe(
        withLatestFrom(state$),
        switchMap(([[api], {grantor}]) => 
            api.query.trustFund.livingSwitchConds(grantor)),
        map(condition => {
          return {
          type: actions.SET_GRANTOR_CONDITION,
          payload: condition
        }}
        )
      );

export default combineEpics(fetchGrantorConditionEpic);

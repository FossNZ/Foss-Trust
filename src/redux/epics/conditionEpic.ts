import { ofType, ActionsObservable, StateObservable, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { Observable, combineLatest, of, EMPTY } from 'rxjs';
import actions from '../actions';
import { EpicDependencies } from '../store';
import { State } from '../../types/state';
import { openNotification } from '../../components/common';
import { createTypeUnsafe } from '@polkadot/types';

export type Condition = {
  value: any,
  typeId: number
}

type ConditionAction = {
  type: string,
  payload: Condition
}
const conditionEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<State>,
  {api$}: EpicDependencies
): Observable<AnyAction> =>
  combineLatest([
      api$,
      action$.pipe(ofType<ConditionAction>(actions.UPDATE_CONDITION))
  ]).pipe(
    withLatestFrom(state$),
    switchMap(([[api, {payload}], {mainAccount}]) => {
      const switchCond = createTypeUnsafe('LivingSwitchCond', [payload.value, payload.typeId]);

      return api.tx.trustFund.setLivingSwitchCondition(switchCond).signAndSend(mainAccount.address);
    }),
    switchMap(({
      events = [],
      status
    }) => {
      if (status.isFinalized) {
          for (const {
                  event: {
                      method
                  }
              } of events) {
                  if (method === 'LivingSwitchCondSet') {
                    openNotification('Set Living Switch Condition Success');
                    return of({
                      type: actions.FETCH_CONDITION
                    })
                  }
          }
      }
      return EMPTY;
    })
  );

  const fetchConditionEpic = (
    action$: ActionsObservable<any>,
    state$: StateObservable<State>,
    {api$}: EpicDependencies
    ): Observable<AnyAction> =>
      combineLatest([
          api$,
          action$.pipe(ofType(actions.FETCH_CONDITION))
      ]).pipe(
        withLatestFrom(state$),
        switchMap(([[api], {mainAccount}]) => 
            api.query.trustFund.livingSwitchConds(mainAccount.address)),
        map(condition => {
          return {
          type: actions.SET_CONDITION,
          payload: condition
        }}
        )
      );

export default combineEpics(conditionEpic, fetchConditionEpic);

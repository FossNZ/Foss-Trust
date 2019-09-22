import { ofType, ActionsObservable, StateObservable, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { Observable, combineLatest, of, EMPTY } from 'rxjs';
import actions from '../actions';
import { EpicDependencies } from '../store';
import { openNotification } from '../../components/common';
import { State } from '../../types/state';

type WithDrawAction = {
  type: string,
  payload: number
}

const withDrawEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<State>,
  {api$}: EpicDependencies
): Observable<AnyAction> =>
  combineLatest([
      api$,
      action$.pipe(ofType<WithDrawAction>(actions.WITHDRAW))
  ]).pipe(
    withLatestFrom(state$),
    switchMap(([[api, {payload}], {grantor}]) => {
      return api.tx.trustFund.withdraw(grantor, payload).signAndSend(grantor)
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
                  if (method === 'Withdraw') {
                    openNotification('Withdraw Success');
                    return of({
                      type: actions.FETCH_BENEFICIARIES
                    })
                  }
          }
      }
      return EMPTY;
    })
  );

export default combineEpics(withDrawEpic);

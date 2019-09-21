import { ofType, ActionsObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import actions from '../actions';

  const setAccountEpic = (
    action$: ActionsObservable<AnyAction>
  ): Observable<AnyAction> =>
    action$.pipe(
      ofType(actions.SET_MAIN_ACCOUNT),
      map(() => {
        return {
          type: actions.FETCH_BALANCES
        }
      })
    );

export default setAccountEpic;

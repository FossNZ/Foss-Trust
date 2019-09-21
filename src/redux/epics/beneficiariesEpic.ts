import { ofType, ActionsObservable, StateObservable } from 'redux-observable';
import { AnyAction } from 'redux';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { Observable, combineLatest, of, EMPTY } from 'rxjs';
import actions from '../actions';
import { EpicDependencies } from '../store';
import { push } from 'react-router-redux';

  type Beneficiarie = {
    address: string,
    weight: number
  }

  type BeneficiaresAction = {
      type: string,
      payload: Beneficiarie[]
  }

  const setBeneficiariesEpic = (
    action$: ActionsObservable<any>,
    state$: StateObservable<any>,
    {api$}: EpicDependencies
  ): Observable<AnyAction> =>
    combineLatest([
        api$,
        action$.pipe(ofType<BeneficiaresAction>(actions.SET_BENEFICIARIES))
    ]).pipe(
      withLatestFrom(state$),
      switchMap(([[api, {payload}], {mainAccount}]) => 
        api.tx.trustFund.setBeneficiaries(payload).signAndSend(mainAccount)
      ),
      switchMap(({
        events = [],
        status
      }) => {
        if (status.isFinalized) {
            for (const {
                    event: {
                        method,
                        data
                    }
                } of events) {
                    if (method === 'BeneficiariesSet') {
                        return of(push('/grantorhome'))
                    }
            }
        }
        return EMPTY;
      })
    );

export default setBeneficiariesEpic;

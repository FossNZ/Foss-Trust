import { ofType, ActionsObservable, StateObservable, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, combineLatest, of, EMPTY } from 'rxjs';
import actions from '../actions';
import { EpicDependencies } from '../store';
import { push } from 'react-router-redux';

export type Beneficiarie = {
  beneficiary: string,
  weight: number
}

type BeneficiaresAction = {
    type: string,
    payload: Beneficiarie[]
}

const beneficiariesEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  {api$}: EpicDependencies
): Observable<AnyAction> =>
  combineLatest([
      api$,
      action$.pipe(ofType<BeneficiaresAction>(actions.SET_BENEFICIARIES))
  ]).pipe(
    withLatestFrom(state$),
    switchMap(([[api, {payload}], {mainAccount}]) => {
      return api.tx.trustFund.setBeneficiaries(payload).signAndSend(mainAccount.address)
    }),
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
                      return of(push('/grantorhome')) // TODO: jump to grantorhome
                  }
          }
      }
      return EMPTY;
    })
  );

  const fetchBeneficiariesEpic = (
      action$: ActionsObservable<AnyAction>,
      state$: StateObservable<any>,
      {api$}: EpicDependencies
      ): Observable<AnyAction> =>
      combineLatest([
          api$,
          action$.pipe(ofType(actions.FETCH_BENEFICIARES))
      ]).pipe(
        withLatestFrom(state$),
        switchMap(([[api, {payload}], {mainAccount}]) => {
          return api.query.trustFund.beneficiaries(payload).signAndSend(mainAccount.address)
        }),
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
                          return of(push('/grantorhome')) // TODO: jump to grantorhome
                      }
              }
          }
          return EMPTY;
        })
      );

export default combineEpics(beneficiariesEpic, fetchBeneficiariesEpic);

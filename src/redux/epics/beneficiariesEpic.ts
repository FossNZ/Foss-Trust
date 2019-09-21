import { ofType, ActionsObservable, StateObservable, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { Observable, combineLatest, of, EMPTY } from 'rxjs';
import actions from '../actions';
import { EpicDependencies } from '../store';
import { AccountId } from '@polkadot/types/interfaces';
import { u64 } from '@polkadot/types';
import { State } from '../../types/state';
import { Codec } from '@polkadot/types/types';
import { openNotification } from '../../components/common';

export type BeneficiaryValue = {
  address: string,
  weight: number
}

type UpdateBeneficiaresAction = {
  type: string,
  payload: BeneficiaryValue[]
}

export interface Beneficiary extends Codec {
  address: AccountId,
  weight: u64
}

const beneficiariesEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  {api$}: EpicDependencies
): Observable<AnyAction> =>
  combineLatest([
      api$,
      action$.pipe(ofType<UpdateBeneficiaresAction>(actions.UPDATE_BENEFICIARIES))
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
                      method
                  }
              } of events) {
                  if (method === 'BeneficiariesSet') {
                    openNotification();
                      // return of(push('/grantorhome')) // TODO: jump to grantorhome
                    return of({
                      type: actions.FETCH_BENEFICIARIES
                    })
                  }
          }
      }
      return EMPTY;
    })
  );

  const fetchBeneficiariesEpic = (
    action$: ActionsObservable<any>,
    state$: StateObservable<State>,
    {api$}: EpicDependencies
    ): Observable<AnyAction> =>
      combineLatest([
          api$,
          action$.pipe(ofType(actions.FETCH_BENEFICIARIES))
      ]).pipe(
        withLatestFrom(state$),
        switchMap(([[api], {mainAccount}]) => 
            api.query.trustFund.beneficiaries(mainAccount.address)),
        map(beneficiaries => ({
          type: actions.SET_BENEFICIARIES,
          payload: beneficiaries
        })
        )
      );

export default combineEpics(beneficiariesEpic, fetchBeneficiariesEpic);

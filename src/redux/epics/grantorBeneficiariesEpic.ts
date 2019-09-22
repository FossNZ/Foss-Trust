import { ofType, ActionsObservable, StateObservable, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import actions from '../actions';
import { EpicDependencies } from '../store';
import { AccountId } from '@polkadot/types/interfaces';
import { u64 } from '@polkadot/types';
import { State } from '../../types/state';
import { Codec } from '@polkadot/types/types';

export type BeneficiaryValue = {
  address: string,
  weight: number
}

export interface Beneficiary extends Codec {
  address: AccountId,
  weight: u64
}

  const fetchGrantorBeneficiariesEpic = (
    action$: ActionsObservable<any>,
    state$: StateObservable<State>,
    {api$}: EpicDependencies
    ): Observable<AnyAction> =>
      combineLatest([
          api$,
          action$.pipe(ofType(actions.FETCH_GRANTOR_BENEFICIARIES))
      ]).pipe(
        withLatestFrom(state$),
        switchMap(([[api], {grantor}]) => 
            api.query.trustFund.beneficiaries(grantor)),
        map(beneficiaries => ({
          type: actions.SET_GRANTOR_BENEFICIARIES,
          payload: beneficiaries
        })
        )
      );

export default combineEpics(fetchGrantorBeneficiariesEpic);

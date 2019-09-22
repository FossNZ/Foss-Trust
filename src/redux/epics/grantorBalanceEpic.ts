import { ofType, ActionsObservable, StateObservable } from "redux-observable";
import { AnyAction } from "redux";
import { map, switchMap, withLatestFrom} from 'rxjs/operators';
import actions from "../actions";
import { EpicDependencies } from '../store';
import { combineLatest, Observable, merge } from 'rxjs';

// const enum Assets{
//     BTC, ETH, DAI, USTD
// } // TODO:
const ASSET_IDS = [
    {
        id: 0,
        name: 'BTC'
    },
    {
        id: 1,
        name: 'ETH'
    },
    {
        id: 2,
        name: 'DAI'
    },
    {
        id: 3,
        name: 'USDT'
    }
];

const balanceEpic = (
    action$: ActionsObservable<AnyAction>,
    state$: StateObservable<any>,
    {api$}: EpicDependencies
): Observable<AnyAction> => 
    combineLatest([
        api$,
        action$.pipe(ofType(actions.FETCH_GRANTOR_BALANCES))
    ]).pipe(
        withLatestFrom(state$),
        switchMap(
            ([[api, action], state]) =>
                merge(...ASSET_IDS.map(asset =>
                    api.query.assets.balances([asset.id, state.grantor]).pipe(
                        map(balance => ({
                                type: actions.SET_GRANTOR_BALANCE,
                                payload: {
                                    id: asset.id,
                                    balance
                                }
                            })
                        )
                )))
        )
    );

export default balanceEpic;
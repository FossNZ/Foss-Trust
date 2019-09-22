import { ofType, ActionsObservable, StateObservable } from "redux-observable";
import { AnyAction } from "redux";
import { map, switchMap } from 'rxjs/operators';
import actions from "../actions";
import { EpicDependencies } from '../store';
import { combineLatest, Observable, from } from 'rxjs';
import { InjectedAccount } from "../../types/type";

const initSignerEpic = (
    action$: ActionsObservable<AnyAction>,
    state$: StateObservable<any>,
    {api$}: EpicDependencies
): Observable<AnyAction> => 
    combineLatest([
        api$,
        action$.pipe(ofType(actions.INIT))
    ]).pipe(
        switchMap(
            ([api]) => 
                from((window as any).injectedWeb3['polkadot-js'].enable()).pipe(
                    switchMap((polkadotExt: any) => {
                        console.log(api);
                        (window as any).api = api;
                        api.setSigner(polkadotExt.signer);
                        return from<Promise<InjectedAccount[]>>(new Promise((resolve)=> polkadotExt.accounts.subscribe(resolve)));
                    }),
                    map((accounts: InjectedAccount[]) =>({
                        type: actions.SET_ACCOUNTS,
                        payload: accounts
                      }))
                )
        ),
        
    );

export default initSignerEpic;
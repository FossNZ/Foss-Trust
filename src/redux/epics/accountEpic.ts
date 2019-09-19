import { ofType, ActionsObservable, StateObservable } from "redux-observable";
import { AnyAction } from "redux";
import {withLatestFrom, switchMap} from 'rxjs/operators';
import { of, EMPTY } from "rxjs";
import actions from "../actions";
import { InjectedAccount } from "../../types/type";

const accountEpic = (
    action$: ActionsObservable<AnyAction>,
    state$: StateObservable<any>
) => 
    action$.pipe(
        ofType(actions.CHECK_MAIN_ACCOUNT),
        withLatestFrom(state$),
        switchMap(([action, {mainAccount}]) => {
            if (mainAccount === null) 
                return of({type: actions.SET_MAIN_ACCOUNT, payload: action.payload[0]});

            const matched = action.payload.filter((account: InjectedAccount) => account.address === mainAccount.address)
            if (matched.length) {
                return EMPTY;
            }
            return of({type: actions.SET_MAIN_ACCOUNT, payload: action.payload[0]});
        })
    );

export default accountEpic;
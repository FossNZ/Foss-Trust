import { ofType, ActionsObservable, StateObservable } from "redux-observable";
import { AnyAction } from "redux";
import { switchMap, map} from 'rxjs/operators';
import actions from "../actions";
import { EpicDependencies } from '../store';
import { combineLatest, Observable, of, EMPTY} from 'rxjs';

type FetchBlockHeightAction = {
    type: string
}

const blockHeightEpic = (
    action$: ActionsObservable<AnyAction>,
    state$: StateObservable<any>,
    {api$}: EpicDependencies
): Observable<AnyAction> => 
    combineLatest([
        api$,
        action$.pipe(ofType<FetchBlockHeightAction>(actions.FETCH_BLOCKHEIGHT))
    ]).pipe(
        switchMap(
            ([api]) => {
                return api.rpc.chain.subscribeNewHeads().pipe(
                    map(({number}) =>
                        ({
                           type: actions.SET_BLOCK_HEIGHT,
                           payload: number.toString()
                        })
                    )
                )
            }
        )
    );

export default blockHeightEpic;
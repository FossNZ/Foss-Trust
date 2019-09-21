// import { ofType, ActionsObservable } from 'redux-observable';
// import { AnyAction } from 'redux';
// import { switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import actions from '../actions';

//   const setAccountEpic = (
//     action$: ActionsObservable<AnyAction>
//   ): Observable<AnyAction> =>
//     action$.pipe(
//       ofType(actions.SET_BENEFICIAREIES),
//       switchMap(() => {
//         return {
//           type: actions.FETCH_BALANCES
//         }
//       })
//     );

// export default setAccountEpic;

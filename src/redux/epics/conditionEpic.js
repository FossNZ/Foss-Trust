// import { ofType, ActionsObservable, StateObservable, combineEpics } from 'redux-observable';
// import { AnyAction } from 'redux';
// import { switchMap, withLatestFrom, map } from 'rxjs/operators';
// import { Observable, combineLatest, of, EMPTY } from 'rxjs';
// import actions from '../actions';
// import { EpicDependencies } from '../store';
// import { State } from '../../types/state';
// import { openNotification } from '../../components/common';

// type conditionAction = {
//   type: string,
//   payload: {
//     value: any,
//     typeId: number
//   }
// }
// const conditionEpic = (
//   action$: ActionsObservable<any>,
//   state$: StateObservable<any>,
//   {api$}: EpicDependencies
// ): Observable<AnyAction> =>
//   combineLatest([
//       api$,
//       action$.pipe(ofType<conditionAction>(actions.UPDATE_CONDITION))
//   ]).pipe(
//     withLatestFrom(state$),
//     switchMap(([[api, {payload}], {mainAccount}]) => {
//       const switchCond = createType('LivingSwitchCond', payload.value, payload.typeId);

//       return api.tx.trustFund.setLivingSwitchCondition(switchCond).signAndSend(mainAccount.address);
//     }),
//     switchMap(({
//       events = [],
//       status
//     }) => {
//       if (status.isFinalized) {
//           for (const {
//                   event: {
//                       method
//                   }
//               } of events) {
//                   if (method === 'LivingSwitchCondSet') {
//                     openNotification('Set LivingSwitchCondition Success');
//                     return of({
//                       type: actions.FETCH_
//                     })
//                   }
//           }
//       }
//       return EMPTY;
//     })
//   );

//   const fetchConditionEpic = (
//     action$: ActionsObservable<any>,
//     state$: StateObservable<State>,
//     {api$}: EpicDependencies
//     ): Observable<AnyAction> =>
//       combineLatest([
//           api$,
//           action$.pipe(ofType(actions.FETCH_CONDITION))
//       ]).pipe(
//         withLatestFrom(state$),
//         switchMap(([[api], {mainAccount}]) => 
//             api.query.trustFund.livingSwitchConds(mainAccount.address)),
//         map(condition => ({
//           type: actions.SET_CONDITION,
//           payload: condition
//         })
//         )
//       );

// export default combineEpics(fetchConditionEpic);

import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
import { ApiRx, WsProvider } from '@polkadot/api';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers/index';
import epics from './epics/index';
import { Observable } from 'rxjs';
import { InjectedAccount } from '../types/type';
import actions from './actions';

export const history = createHistory();

const api = ApiRx.create({
  provider: new WsProvider('wss://poc3-rpc.polkadot.io/')
});

const epicMiddleware = createEpicMiddleware({
  dependencies: { api$: api }
});

export type EpicDependencies = { api$: Observable<ApiRx> };

const composeEnhancers = composeWithDevTools({
  realtime: true
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)))
);

const getInjected = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      if ((window as any).injectedWeb3) {
        resolve((window as any).injectedWeb3);
      } else {
        reject(new Error('injectedWeb3 not found!'));
      }
    });
  });

getInjected()
  .then((injectedWeb3: any) => {
    return injectedWeb3['polkadot-js'].enable();
  })
  .then(Polkadotjs => {
    (window as any).Polkadotjs = Polkadotjs;
    Polkadotjs.accounts.subscribe((accounts: InjectedAccount) => {
      store.dispatch({
        type: actions.SET_ACCOUNTS,
        payload: accounts
      });
      store.dispatch({
        type: actions.CHECK_MAIN_ACCOUNT,
        payload: accounts
      });
    });
  });

epicMiddleware.run(epics);

export default store;

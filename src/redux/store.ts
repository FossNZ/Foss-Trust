import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
import { ApiRx } from '@polkadot/api';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers/index';
import epics from './epics/index';
import { Observable } from 'rxjs';
import { InjectedAccount } from '../types/type';
import actions from './actions';

export const history = createHistory();

const typeDefs = {
	BeneficiaryShare: {
		address: 'AccountId',
		weight: 'u64'
	},
	LivingSwitchCond: {
		_enum: {
			None: "Null",
			BlockHeight: "BlockNumber",
			Timestamp: "Moment",
			ClockInInterval: "BlockNumber"
		}
	}
}

const api = ApiRx.create({types: typeDefs});

// const api = ApiRx.create({provider: new WsProvider('wss://poc3-rpc.polkadot.io/')});

const epicMiddleware = createEpicMiddleware({
  dependencies: { api$: api }
});

export type EpicDependencies = { api$: Observable<ApiRx> };

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)))
);

window.addEventListener('load', () => {
  store.dispatch({type: actions.INIT});
});

epicMiddleware.run(epics);

export default store;

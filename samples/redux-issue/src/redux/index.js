/**
 * Created by CrazyUmka on 23.10.2015.
 */

import { combineReducers, compose, createStore, applyMiddleware } from './lib';

import * as reducers from './reducers.js';

console.log('REDUCERS ::: ' + Object.keys(reducers))

//const reducers = Object.assign({}, helloWorldReducers);
const rootReducer = combineReducers(reducers);

const finalCreateStore = compose(
  applyMiddleware()
)(createStore);

const store = finalCreateStore(rootReducer);
store.dispatch({ type: 'TEST' });
export default store;
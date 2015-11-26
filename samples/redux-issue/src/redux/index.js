/**
 * Created by CrazyUmka on 23.10.2015.
 */

import { combineReducers, compose, createStore, applyMiddleware } from './lib';

import helloWorldReducers from './reducers.js';

const reducers = Object.assign({}, helloWorldReducers);
const rootReducer = combineReducers(reducers);

const finalCreateStore = compose(
  //applyMiddleware(thunk, logger)
  // devTools(),
  // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(rootReducer);
export default store;
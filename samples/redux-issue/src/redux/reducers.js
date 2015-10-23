/**
 * Created by CrazyUmka on 23.10.2015.
 */
import { ADD_MESSAGE, DELETE_MESSAGE } from './actions.js';

export function auth(state = {messages: []}, action) {
  switch (action.type) {
    // CHANGE STATE FOR AUTH
    case ADD_MESSAGE:
      return Object.assign({}, state, {messages: [...state.messages, action.text]});
case DELETE_MESSAGE:
    return Object.assign({}, state, {messages: [...state.messages.slice(0, action.id),
      ...state.messages.slice(action.id + 1)]});
default:
return state;
}
}
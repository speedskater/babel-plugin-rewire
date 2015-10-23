/**
 * Created by CrazyUmka on 23.10.2015.
 */
export const ADD_MESSAGE = 'ADD_MESSAGE';
export function addMessage(text){
  return {
    type: ADD_MESSAGE, text
  }
}

export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export function deleteMessage(id){
  return {
    type: DELETE_MESSAGE, id
  }
}

import { SET_AUTH_USER, CLEAR_AUTH_USER } from '../actions/authenticatedUser';

export default function authenticatedUser(state = null, action) {

  switch (action.type) {

    case SET_AUTH_USER:
      console.log('action.id: ', action.id)
      return action.id;

    case CLEAR_AUTH_USER:
      return null;
      
    default:
      return state;
  }
}

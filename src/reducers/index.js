import { combineReducers } from 'redux';
import authenticatedUser from './authenticatedUser';
import questions from './questions';
import users from './users';

export default combineReducers({
  authenticatedUser: authenticatedUser,
  questions,
  users,
});
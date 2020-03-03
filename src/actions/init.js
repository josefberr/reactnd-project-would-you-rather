import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export function handleInitialData() {

  return function(dispatch) {
    getInitialData()
        .then(function({users, questions}) {
          dispatch(receiveUsers(users));
          dispatch(receiveQuestions(questions));
      });
  }
}

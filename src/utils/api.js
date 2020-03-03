import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js';

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(function([users, questions]) {
    return {
      users,
      questions,
    };
  });
};

export function saveQuestion(details) {
  return _saveQuestion(details);
};

export function saveQuestionAnswer(details) {
  return _saveQuestionAnswer(details);
}

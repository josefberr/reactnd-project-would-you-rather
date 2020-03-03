import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}


export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return function(dispatch, getState) {
    const { authenticatedUser } = getState();

    const questionDetails = {
      optionOneText,
      optionTwoText,
      author: authenticatedUser,
    };

    return saveQuestion(questionDetails)
      .then(function(question) { dispatch(addQuestion(question)) });
  };
}

export function answerQuestion(authenticatedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authenticatedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion(question, answer) {
  return function(dispatch, getState) {
    const { authenticatedUser } = getState();

    const answerDetails = {
      authenticatedUser,
      qid: question.id,
      answer,
    };

    return saveQuestionAnswer(answerDetails)
      .then(function() { dispatch((answerQuestion(authenticatedUser, question, answer))) })
  }
}

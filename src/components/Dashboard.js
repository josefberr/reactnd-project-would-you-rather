import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  /* state = {
    showAnswered: false,
  } */

 /*  handleFilterClicked = function(answered) {
    this.setState(function() {
      return {
        showAnswered: answered
      };
    });
  } */

  render() {
    //const { showAnswered } = this.state;
    const { authenticatedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);

    let { answeredQuestions, unAnsweredQuestions } = []
    /*
    answeredQuestions = questionsArray.filter(function(question) {
      let answeredQuestion = {};
      return answeredQuestion = (
        question.optionOne.votes.indexOf(authenticatedUser) >= 0 ||
        question.optionTwo.votes.indexOf(authenticatedUser) >= 0
      );
    });*/

    answeredQuestions = questionsArray.filter((question) => {
      return (question.optionOne.votes.indexOf(authenticatedUser) >= 0 ||  question.optionTwo.votes.indexOf(authenticatedUser) >= 0 )
    });

    unAnsweredQuestions = questionsArray.filter((question) => {
      return (question.optionOne.votes.indexOf(authenticatedUser) < 0) && (question.optionTwo.votes.indexOf(authenticatedUser) < 0 )
    });

    /*
    unAnsweredQuestions = questionsArray.filter(function(question) {
      let unAnsweredQuestion = {};

      return unAnsweredQuestion = (
        (question.optionOne.votes.indexOf(authenticatedUser) < 0) && (question.optionTwo.votes.indexOf(authenticatedUser) < 0)
      );
    });*/

    const sortedAnsweredQuestions = answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
    const sortedUnansweredQuestions = unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    console.log("ANSWERED BY USER:" + sortedAnsweredQuestions)
    console.log("NOT ANSWERED BY USER:" + sortedUnansweredQuestions)



    /* const filteredQuestions = questionsArray.filter(function(question) {
      const contains = (
        question.optionOne.votes.indexOf(authenticatedUser) > -1 ||
        question.optionTwo.votes.indexOf(authenticatedUser) > -1
      );
      return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp); */

    return (
      <div>
        <h3 className='center'>Dashboard</h3>
        {/* <div className='btn-group'>
          <button
            className={!showAnswered ? 'btn-lft active' : 'btn-lft'}
            onClick={(event) => this.handleFilterClicked(false)}
          >
            Unanswered
          </button>
          <button
            className={showAnswered ? 'btn-rght active' : 'btn-rght'}
            onClick={(event) => this.handleFilterClicked(true)}
          >
            Answered
          </button>
        </div>
        <ul className='question-list'>
          {sortedQuestions.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ul> */}
        {
          sortedUnansweredQuestions.length === 0 ? <span>You have no questions left to answer</span> : ''
        }
        <div className='not-answered-questions'>
            <h3>Your available questions</h3>
            <ul className='question-list'>
              {
                  sortedUnansweredQuestions.map((question) => (
                  <li key={question.id}>
                    <Question question={question} />
                  </li>
                  ))
              }
            </ul>
        </div> 
        
        {
          sortedAnsweredQuestions.length === 0 ? <span>You have no questions answered yet</span> : ''
        }
        <div className='answered-questions'>
            <h3>Your answered questions</h3>
            <ul className='question-list'>
              {
                  sortedAnsweredQuestions.map((question) => (
                  <li key={question.id}>
                    <Question question={question} />
                  </li>
                ))
              }
            </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authenticatedUser, questions, users }) {
  return {
    authenticatedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard)

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/questions';

class Question extends Component {
  
  handleOptionClicked = function(option) {
    const { answerQuestion, authenticatedUser, question } = this.props
    const answer = option === 1 ? 'optionOne' : 'optionTwo'

    answerQuestion(authenticatedUser, question.id, answer)
  }

  render() {
    const { authenticatedUser, question, users } = this.props

    const answers = Object.keys(users[authenticatedUser].answers)
    const answered = answers.indexOf(question.id) > -1 ? true : false
    
    const votesOptionOne = question.optionOne.votes.length
    const votesOptionTwo = question.optionTwo.votes.length
    const totalVotes = votesOptionOne + votesOptionTwo

    if (!question) {
      return <Redirect to="/404" />;
    }

    return (
        <Link to={`/questions/${question.id}`} className='question'>
        <div className='question-box singe-question'>
        <img
          src={`/${users[question.author].avatarURL}`}
          alt={question.author}
          className='avatar'
        />
        <span>{question.author} asked. <br/>Would You Rather...</span>
        <div className='option'>
          <button
            className={
              question.optionOne.votes.indexOf(authenticatedUser) > -1
              ? 'question-option-selected'
              : answered
                ? 'answered'
                : ''
            }
            onClick={() => this.handleOptionClicked(1)}
            disabled={answered}
          >
            {question.optionOne.text}
          </button>
        </div>
        <div className='option'>
          <button
            className={
              question.optionTwo.votes.indexOf(authenticatedUser) > -1
              ? 'question-option-two question-option-selected'
              : answered
                ? 'question-option-two answered'
                : 'question-option-two'
            }
            onClick={() => this.handleOptionClicked(2)}
            disabled={answered}
          >
            {question.optionTwo.text}
          </button>
        </div>
        {answered && <div className='stats'>
              Votes: 
            <div className='vote1' style={{width: votesOptionOne/totalVotes*100 + '%'}}>{votesOptionOne}</div>
            <div className='vote2' style={{width: votesOptionTwo/totalVotes*100 + '%'}}>{votesOptionTwo}</div>
          </div>}
        
        </div>
        </Link>
    );
  }
}

function mapStateToProps({ authenticatedUser, users }) {
  return {
    authenticatedUser,
    users,
  };
}

export default connect(mapStateToProps, actions)(Question);

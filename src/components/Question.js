import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/questions';

class Question extends Component {
  state = {
    showDetail: false,
  }

  handleOptionClicked = function(option) {
    console.log(this.props)
    const { answerQuestion, authenticatedUser, question } = this.props
    const answer = option === 1 ? 'optionOne' : 'optionTwo'

    answerQuestion(authenticatedUser, question.id, answer)
  }

  render() {
    //console.log("GOT SOME DATA..... " + this.props)

    const { authenticatedUser, question, users } = this.props

    const answers = Object.keys(users[authenticatedUser].answers)
    const answered = answers.indexOf(question.id) > -1 ? true : false
    
    const votesOptionOne = question.optionOne.votes.length
    const votesOptionTwo = question.optionTwo.votes.length
    
    //const { showDetail } = this.state

    console.log("QUESTION" + question.id, question)
    if (question.id === null) {
      return <Redirect to="/404" />;
    }

    return (
        <div>
        <Link to={`/questions/${question.id}`} className='question'>
        <img
          src={`/${users[question.author].avatarURL}`}
          alt={question.author}
          className='avatar'
        />
        <div>

        <span>{question.author} asked. Would You Rather...</span>
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
          >
            {question.optionTwo.text}
          </button>
        </div>
        </div>
      
        {answered && <div className='stats'>Votes: {votesOptionOne} : {votesOptionTwo}
          </div>}
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ authenticatedUser, users }) {
  console.log(actions)
  return {
    authenticatedUser,
    users,
  };
}

export default connect(mapStateToProps, actions)(Question);

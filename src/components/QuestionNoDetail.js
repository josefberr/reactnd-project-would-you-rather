import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/questions';

class QuestionNoDetail extends Component {

  handleOptionClicked = function(option) {
    console.log(this.props)
    const { answerQuestion, authenticatedUser, question } = this.props
    const answer = option === 1 ? 'optionOne' : 'optionTwo'

    answerQuestion(authenticatedUser, question.id, answer)
  }

  render() {
    console.log("GOT SOME DATA..... " + this.props)

    const { question, users } = this.props

    return (
        <div className='question-box'>
        <Link to={`/questions/${question.id}`} className='question'>
          <div>
            <span className='author left'>{question.author}  asked:</span>
            <span className='left'>Would You Rather...<br/>
            {question.optionOne.text} or {question.optionTwo.text} </span>
          </div>
        </Link>
        <img
            src={`/${users[question.author].avatarURL}`}
            alt={question.author}
            className='avatar'
          />
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

export default connect(mapStateToProps, actions)(QuestionNoDetail);

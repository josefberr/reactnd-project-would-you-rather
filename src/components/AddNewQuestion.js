import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class AddNewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleChange = function(event, optionIndex) {
    const text = event.target.value;

    this.setState((previousState) => {
      return optionIndex === 1
        ? { ...previousState, 'optionOne': text }
        : { ...previousState, 'optionTwo': text };
    });
  }

  handleSubmit = function(event) {
    event.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState((previousState) => {
      return {
        ...previousState,
        toHome: true,
      };
    })
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    const { authenticatedUser, users } = this.props;
    console.log(authenticatedUser)
    console.log(users)

    if (toHome === true) {
      console.log("YOU SHOULD BE REDIRECTED TO HOME")
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className='center'>Add new Question</h3>
        <div className='question-box'>
          <img
            src={`/${users[authenticatedUser].avatarURL}`}
            alt={authenticatedUser}
            className='avatar'
          />
          <form onSubmit={(event) => this.handleSubmit(event)}>
          <p>Would You Rather...</p>
            <div className="option">
              <textarea
                placeholder='Option one'
                value={optionOne}
                onChange={(event) => this.handleChange(event, 1)}
              />
            </div>
            <div className="option">
              <textarea
                placeholder='Option two'
                value={optionTwo}
                onChange={(event) => this.handleChange(event, 2)}
              />
            </div>
            <button
              className='btn'
              type='submit'
              disabled={optionOne === '' || optionTwo === ''}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authenticatedUser, users }) {
  return {
    authenticatedUser,
    users,
  };
}

export default connect(mapStateToProps)(AddNewQuestion)

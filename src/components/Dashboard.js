import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionNoDetail from './QuestionNoDetail'

class Dashboard extends Component {
  state = {
      filterAnswered: true,
   }

   handleFilterClicked = function(hide) {
    this.setState(function() {
      return {
        filterAnswered: hide
      };
    });
  }

  render() {
    const { filterAnswered } = this.state;
    const { authenticatedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
     
    const questionsToShow = questionsArray.filter((question) => {
      if (filterAnswered) {
        return (question.optionOne.votes.indexOf(authenticatedUser) < 0) && (question.optionTwo.votes.indexOf(authenticatedUser) < 0 )
      } 
      else {
        return (question.optionOne.votes.indexOf(authenticatedUser) >= 0 ||  question.optionTwo.votes.indexOf(authenticatedUser) >= 0)
      }
    });

    const sortedQuestions = questionsToShow.sort((a, b) => b.timestamp - a.timestamp);
    
    return (
      <div className='center'>
        <h3 className='center'>Dashboard</h3>
        <button 
          onClick={() => this.handleFilterClicked(false)}
          className={!filterAnswered ? 'btn-active' : 'btn-inactive'}
        >
          Answered questions
        </button>

        <button 
          onClick={() => this.handleFilterClicked(true)}
          className={filterAnswered ? 'btn-active' : 'btn-inactive'}
        >
          Open polls</button>

        <div className='questions-container'>
        <h3>{filterAnswered && 'Open '}Questions</h3>
        {
          sortedQuestions.length === 0 ? <p>no polls found</p> : ''
        }
            <ul className='question-list'>
              {
                  sortedQuestions.map((question) => (
                  <li key={question.id}>
                    
                    <QuestionNoDetail question={question} detail={false} />
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

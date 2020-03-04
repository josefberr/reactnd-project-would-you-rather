import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Question from './Question';

function QuestionOverview(props) {
  const { id, questions } = props;
  const question = questions[id];

  if(!question) {
    return <Redirect from='*' to='/questions/bad_id' />
  }

  return (
    <div>
      <h3 className='center'>Question</h3>
      {
        <Question question={question} />
      }
    </div>
  );
}

function mapStateToProps({ authenticatedUser, questions }, props) {
  const { id } = props.match.params;
  
  return {
    id,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionOverview);

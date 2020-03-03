import React from 'react';
import { connect } from 'react-redux';

function Leaderboard(props) {
  const { users } = props;
  const userArray = Object.keys(users).map((key) => users[key]);
  
  const sortedUserArray = userArray.sort((a, b) => {
    const sumA = Object.keys(a.answers).length + a.questions.length;
    const sumB = Object.keys(b.answers).length + b.questions.length;
    return sumB -sumA;
  })

  return (
    <div>
      <h3 className='center'>Leaderboard</h3>
      <ul className='user-list'>
        {sortedUserArray.map((user) => (
          <li key={user.id}>
            <div className='user'>
              <span>{user.name}</span>
              <img
                src={user.avatarURL}
                alt={user.name}
                className='avatar'
              />
              <div className='user-stats'>
                <p>Asked: {user.questions.length}</p>
                <p>Answered: {Object.keys(user.answers).length}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard)

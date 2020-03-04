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
            <div className='user-list-container'>
              <div className='user'>
                <img
                  src={user.avatarURL}
                  alt={user.name}
                  className='avatar'
                />
                {user.name}
              </div>
              <div className='user-stats'> 
                <p>Total Points: {user.questions.length + Object.keys(user.answers).length}</p>
                <p>Asked: {user.questions.length} / Answered: {Object.keys(user.answers).length}</p>
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

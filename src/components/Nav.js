import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  const { authenticatedUser, users } = props

  const avatar = authenticatedUser ? users[authenticatedUser].avatarURL : 'blank.jpg';
  const userLoggedIn = authenticatedUser !== null

  return (
    <nav className='nav-container'>
      <div className='nav'><NavLink to='/' exact activeClassName='active'>Home</NavLink></div>
      <div className='nav'><NavLink to='/leaderboard' exact activeClassName='active'>Leaderboard</NavLink></div>
      <div className='nav'><NavLink to='/add' exact activeClassName='active'>Add New Question</NavLink></div>
      <div className='nav'>
        {userLoggedIn 
            ? 
              <NavLink to='/login' exact activeClassName='active'>Logout<img src={avatar} alt={authenticatedUser} title={authenticatedUser} className='avatar-thumb' /></NavLink>
            : 
              <NavLink to='/login' exact activeClassName='active'>
                Login
              </NavLink>
          }
      </div>
    </nav>
    );    
}

function mapStateToProps({ authenticatedUser, users }) {
  return {
    authenticatedUser,
    users
  };
}

export default connect(mapStateToProps, null, null, { pure: false })(Nav)

import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthenticatedUser, clearAuthenticatedUser } from '../actions/authenticatedUser';

class Login extends Component {
  state = {
    userId: null,
    goToStart: false,
  }

  handleSelectionChanged = function(event) {
    const userId = event.target.value;

    this.setState(function(previousState) {
      return {
        ...previousState,
        userId,
      };
    });
  }

  handleLogin = function(event) {
    const { userId } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthenticatedUser(userId));

    this.setState((previousState) => {
      return {
        ...previousState,
        goToStart: true,
      };
    });
  }

  componentDidMount() {
    this.props.dispatch(clearAuthenticatedUser())
  }

  render() {
    const { userId, goToStart } = this.state;
    const { history, users } = this.props;
    const selected = userId ? userId : -1;
    const avatar = userId ? users[userId].avatarURL : 'blank.jpg';

    const redirect = goToStart ? '/' : history.location.state;
    if (goToStart) {
      return <Redirect to={redirect} push={goToStart} />
    }

    return (
      <div>
        <h3 className='center'>Login</h3>
        <div className='login-box'>
          <span>Please select a user</span>
          <div className='user-select'>
           <img
              src={avatar}
              alt={userId}
              className='avatar'
            />
            <select value={selected} onChange={(event) => this.handleSelectionChanged(event)}>
              <option value={-1} disabled>Select user...</option>
              {Object.keys(users).map(function(key) {
                return (
                  <option value={users[key].id} key={key}>{users[key].id}</option>
                );
              })}
            </select>
          </div>
          <button
            className='btn'
            disabled={userId === null}
            onClick={(event) => this.handleLogin(event)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login))



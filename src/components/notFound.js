import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>404 Page Not Found</h3>
        <p className='center'>Please use the navigation to access the available pages</p>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(NotFound)

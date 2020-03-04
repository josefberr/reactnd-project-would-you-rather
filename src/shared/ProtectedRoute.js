import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
  const redirect = rest.location.pathname;

  return (
    <Route {...rest} render={function(props) {
      return (
        rest.useruserLoggedIn
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: redirect
          }} />
      )}
    } />
  );
}

export default withRouter(ProtectedRoute);

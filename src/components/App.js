import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/init';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Login from './Login';
import Nav from './Nav';
import AddNewQuestion from './AddNewQuestion';
import NotFound from './404-notFound';
import QuestionOverview from './QuestionOverview';
import ProtectedRoute from '../utils/ProtectedRoute';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { useruserLoggedIn } = this.props;
    console.log(useruserLoggedIn)

    return (
      <Router>
        <Fragment>
          <div className='container'>
            <Nav />
              <div>
                <Switch>
                  <Route path='/login' exact component={Login} />
                  <ProtectedRoute path='/' exact component={Dashboard} useruserLoggedIn={useruserLoggedIn} />
                  <ProtectedRoute path='/add' exact component={AddNewQuestion} useruserLoggedIn={useruserLoggedIn} />
                  <ProtectedRoute path='/questions/:id' exact component={QuestionOverview} useruserLoggedIn={useruserLoggedIn} />
                  <ProtectedRoute path='/leaderboard' exact component={Leaderboard} useruserLoggedIn={useruserLoggedIn} />
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authenticatedUser }) {
  return {
    useruserLoggedIn: authenticatedUser !== null,
  };
}

export default connect(mapStateToProps)(App);

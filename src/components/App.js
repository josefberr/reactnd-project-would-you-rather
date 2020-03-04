import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/init';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Login from './Login';
import Nav from './Nav';
import AddNewQuestion from './AddNewQuestion';
import NotFound from './notFound';
import QuestionOverview from './QuestionOverview';
import ProtectedRoute from '../shared/ProtectedRoute';

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
                  <ProtectedRoute path='/' exact component={Dashboard} useruserLoggedIn={useruserLoggedIn} />
                  <Route path='/login' exact component={Login} />
                  <Route path='/questions/bad_id' exact component={NotFound}/>
                  <ProtectedRoute path='/add' exact component={AddNewQuestion} useruserLoggedIn={useruserLoggedIn} />
                  <ProtectedRoute path='/questions/:id' exact component={QuestionOverview} useruserLoggedIn={useruserLoggedIn} />
                  <ProtectedRoute path='/leaderboard' exact component={Leaderboard} useruserLoggedIn={useruserLoggedIn} />
                  <ProtectedRoute path='/404' component={NotFound} />
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

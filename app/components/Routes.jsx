import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import About from 'components/About';
import App from 'components/App';
import Login from 'components/Login';
import Preferences from 'components/Preferences';
import React from 'react';
import Registration from 'components/Registration';
import Results from 'components/Results';
import Search from 'components/Search';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/" >
        <IndexRoute component={Search} />
        <Route component={Registration} path="/registration" />
        <Route component={Login} path="/login" />
        <Route component={About} path="/about" />
        <Route component={Search} path="/search" />
        <Route component={Results} path="/results" />
        <Route component={Preferences} path="/preferences" />
      </Route>
    </Router>;
  }
});

export default Routes;

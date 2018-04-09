
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import App from './App';
import Portfolio from './components/Portfolio'

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/portfolio" component={Portfolio}/>
    </Switch>
  </Router>
)

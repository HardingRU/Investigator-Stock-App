
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import App from './App';
import Portfolio from './components/Portfolio'
import Search from './components/Search'
import ViewStock from './components/ViewStock'
import Register from './components/Register'

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/portfolio" component={Portfolio}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/register" component={Register}/>
      <Route path='/stock/:ticker' component={ViewStock}/>
    </Switch>
  </Router>
)

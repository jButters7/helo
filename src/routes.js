import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';
import Post from './Components/Post';

export default (
  <Switch>

    <Route exact path='/' component={Auth} />
    <Route exact path='/dashboard' component={Dashboard} />
    <Route exact path='/post/:postid' component={Post} />
    <Route exact path='/new' component={Form} />

  </Switch>
)
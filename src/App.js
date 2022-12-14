import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import 'bulma/css/bulma.min.css';
import './Style/Login.scss';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Switch>

        <Route exact path="/" component={ Login } />

        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

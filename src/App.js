import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import AvatarPage from './pages/js/AvatarPage';
import ChatPage from './pages/js/ChatPage';
import FrontPage from './pages/js/FrontPage';
import LoginPage from './pages/js/LoginPage';
import NicknamePage from './pages/js/NicknamePage';

import MyAction from './state/action';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    MyAction.userCheck();
    return (
      <Router>
        <Switch>
          <Route path="/chat/:id" component={ChatPage} />
          <Route path="/avatar" component={AvatarPage} />
          <Route path="/nickname" component={NicknamePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/front" component={FrontPage} />
          <Redirect to="/front"/>
        </Switch>
      </Router>
    )
  }
}

export default App;

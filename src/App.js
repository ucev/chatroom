import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FrontPage from './FrontPage';
import ChatPage from './ChatPage';

import MyAction from './state/action';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = MyAction.getState();
    this.__update = this.__update.bind(this);
  }
  componentDidMount() {
    MyAction.subscribe(this.__update);
    MyAction.pageCheck();
  }
  componentWillUnmount() {
    MyAction.unsubscribe();
  }
  __update() {
    this.setState(MyAction.getState());
  }
  render() {
    if (this.state.curpage == 'front') {
      return (
        <FrontPage key="front" state={this.state}/>
      )
    } else {
      return (
        <ChatPage />
      )
    }
  }
}

export default App;

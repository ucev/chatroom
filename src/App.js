import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FrontPage from './pages/js/FrontPage';
import ChatPage from './pages/js/ChatPage';
import AvatarPage from './pages/js/AvatarPage';
import NicknamePage from './pages/js/NicknamePage';

import MyAction from './state/action';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = MyAction.getState();
    this.__update = this.__update.bind(this);
  }
  componentDidMount() {
    MyAction.subscribe(this.__update);
    // 初始化
    MyAction.pageSetState("front_page", "ongoing_dialog");
  }
  componentWillUnmount() {
    MyAction.unsubscribe();
  }
  __update() {
    this.setState(MyAction.getState());
  }
  render() {
    var pageManager = this.state.pageState;
    switch (pageManager.getPage()) {
      case "chat_page":
        return (
          <ChatPage key="chat_page" toid={this.state.toid} userid={this.state.userid} users={this.state.users} conversations={this.state.conversations} newinfo={this.state.newinfo} />
        );
      case "avatar_page":
        return (
          <AvatarPage avatar={this.state.avatar} />
        );
      case "nickname_page":
        return (
          <NicknamePage nickname={this.state.nickname} />
        );
      default:
        return (
          <FrontPage key="front_page" state={this.state} />
        )
    }
  }
}

export default App;

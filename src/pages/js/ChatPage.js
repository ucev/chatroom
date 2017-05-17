import React from 'react';
import BasePage from './BasePage';
import {
  Redirect
} from 'react-router-dom';
import SentenceItem from '../../components/js/SentenceItem';
import SentenceInput from '../../components/js/SentenceInput';

import MyAction from '../../state/action';

import '../css/ChatPage.css';

class ChatPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = MyAction.getState();
    this.back = this.back.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.chatTo = this.chatTo.bind(this);
  }
  componentDidUpdate() {
    document.body.scrollTop = document.body.scrollHeight;
  }

  componentDidMount() {
    super.componentDidMount();
    MyAction.startChat(this.props.match.params.id);
    document.body.scrollTop = document.body.scrollHeight;
  }

  back() {
    this.props.history.goBack();
  }

  getUserInfo(id) {
    var users = this.state.users;
    for (var user of users) {
      if (user.id == id) {
        return user;
      }
    }
    return {};
  }

  chatTo() {
    var newinfo = this.state.newinfo;
    MyAction.startChat(newinfo.from);
  }

  render() {
    if (!MyAction.userCheck()) {
      return <Redirect to="/login"/>;
    }
    if (!this.props.match.params.id) {
      return <Redirect to="/"/>
    }
    var userid = this.state.userid;
    var chatItem = this.state.conversations;
    var sentences = chatItem.map((chat, index) => {
      var userinfo = this.getUserInfo(chat.from);
      return <SentenceItem key={index} ownerid={userid} fromid={chat.from} nickname={userinfo.name} avatar={MyAction.getAvatarPath(userinfo.avatar)} content={chat.content} />
    });
    var newinfo = this.state.newinfo;
    return (
      <div className="App">
        <div className="App-header chat-page-header">
          {newinfo.from > 0 &&
            <div className="new-chat-notification" onClick={this.chatTo}>{this.getUserInfo(newinfo.from).name}: {newinfo.info}</div>
          }
          <img className="back-arrow" src="/images/ic_arrow_back_white_36dp_2x.png" onClick={this.back} />
          <h2>Chatroom DEMO</h2>
        </div>
        <div className="App-body chat-page-body">
          <div className="sentences-div">{sentences}</div>
        </div>
        <div className="App-foot">
          <SentenceInput />
        </div>
      </div>
    )
  }
}

module.exports = ChatPage;

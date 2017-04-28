import React, { Component } from 'react';

import SentenceItem from './components/js/SentenceItem';
import SentenceInput from './components/js/SentenceInput';

import MyAction from './state/action';

import './ChatPage.css';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  componentDidUpdate() {
    document.body.scrollTop = document.body.scrollHeight;
  }

  componentDidMount() {
    document.body.scrollTop = document.body.scrollHeight;
  }

  back() {
    MyAction.curPageChange("front");
  }

  getUserInfo(id) {
    var users = this.props.users;
    for (var user of users) {
      if (user.id == id) {
        return user;
      }
    }
    return {};
  }

  render() {
    var userid = this.props.userid;
    var chatItem = this.props.conversations;
    var sentences = chatItem.map((chat, index) => {
      var userinfo = this.getUserInfo(chat.from);
      return <SentenceItem key={index} ownerid={userid} fromid={chat.from} nickname={userinfo.name} avatar={MyAction.getAvatarPath(userinfo.avatar)} content={chat.content} />
    });
    var newinfo = this.props.newinfo;
    return (
      <div className="App">
        <div className="App-header">
          {newinfo.from > 0 &&
            <div className="new-chat-notification">{this.getUserInfo(newinfo.from).name}: {newinfo.info}</div>
          }
          <img className="back-arrow" src="/images/ic_arrow_back_white_36dp_2x.png" onClick={this.back} />
          <h2>Chatroom DEMO</h2>
        </div>
        <div className="App-body">
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

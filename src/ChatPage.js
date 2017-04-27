import React, { Component } from 'react';

import SentenceItem from './components/js/SentenceItem';
import SentenceInput from './components/js/SentenceInput';

import MyAction from './state/action';

import './ChatPage.css';

class ChatPage extends Component {

  componentDidUpdate() {
    document.body.scrollTop = document.body.scrollHeight;
  }

  componentDidMount() {
    document.body.scrollTop = document.body.scrollHeight;
  }

  back() {
    MyAction.curPageChange("front");
  }

  getUserName(users, id) {
    for (var user of users) {
      if (user.id == id) {
        return user.name;
      }
    }
    return "";
  }

  render() {
    var userid = this.props.userid;
    var chatItem = this.props.conversations;
    var sentences = chatItem.map((chat, index) => {
      var nickname = this.getUserName(this.props.users, chat.from);
      return <SentenceItem key={index} nickname={"ab"} ownerid={userid} fromid={chat.from} nickname={nickname} sentence={chat.sentence} />
    });
    return (
      <div className="App">
        <div className="App-header">
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

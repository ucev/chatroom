import React, { Component } from 'react';

import SentenceItem from './components/js/SentenceItem';
import SentenceInput from './components/js/SentenceInput';

import './ChatPage.css';

class ChatPage extends Component {
  render() {
    var ownerid=1;
    var chatItem = [
      { fromid: 1, nickname: "张三", sentence: "ABCD"},
      { fromid: 2, nickname: "李四", sentence: "If a certain client is not ready to receive messages (because of network slowness or other issues, or because they’re connected through long polling and is in the middle of a request-response cycle), if it doesn’t receive ALL the tweets related to bieber your application won’t suffer." },
      { fromid: 1, nickname: "张三", sentence: "EFGHIJKLMN"}
    ];
    var sentences = chatItem.map((chat) => {
      return <SentenceItem nickname={chat.nickname} ownerid={ownerid} fromid={chat.fromid} nickname={chat.nickname} sentence={chat.sentence} />
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chatroom DEMO</h2>
        </div>
        <div className="App-body">
          <h1>聊天页面1</h1>
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

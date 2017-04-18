import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OngoingDialog from './components/js/OngoingDialog';
import PageChooser from './components/js/PageChooser';

class App extends Component {
  render() {
    var dialogs = [{avatar: logo, nickname: '张帅', datetime: '周一', conversation: 'hello'}];
    var pageitems = [
      {icon: '/ic_chat_bubble_outline_black_36dp_1x.png', label: '聊天', page: 'chat'},
      {icon: '/ic_person_outline_black_36dp_1x.png', label: '联系人', page: 'contacts'}
    ];
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chatroom DEMO</h2>
        </div>
        <div className="App-body app-page app-page-chat">
          <OngoingDialog dialogs={dialogs}/>
        </div>
        <div className="App-body app-page app-page-contacts">
        </div>
        <div className="App-foot">
          <PageChooser pages={pageitems} />
        </div>
      </div>
    );
  }
}

export default App;

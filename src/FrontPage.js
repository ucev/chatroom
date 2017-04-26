import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import OngoingDialog from './components/js/OngoingDialog';
import Contacts from './components/js/Contacts';
import Login from './components/js/Login';
import PageChooser from './components/js/PageChooser';

import MyAction from './state/action';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var state = this.props.state;
    //var dialogs = [{avatar: logo, nickname: '张帅', datetime: '周一', conversation: 'hello'}];
    var dialogs = [{avatar: '/logo.svg', nickname: '张帅', datetime: '周一', conversation: 'hello'}];
    var pageItems = [
      {icon: '/images/ic_chat_bubble_outline_black_36dp_1x.png', label: '聊天', page: 'chat'},
      {icon: '/images/ic_person_outline_black_36dp_1x.png', label: '联系人', page: 'contact'},
      {icon: '/images/ic_cloud_outline_black_36dp_1x.png', label: '个人', page: 'login'}
    ];
    var currpage = state.page;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chatroom DEMO</h2>
        </div>
        <div className="App-body">
          <div key="chat" className="app-page app-page-chat" style={{display: currpage==="chat" ? "block": "none"}}>
            <OngoingDialog dialogs={dialogs} />
          </div>
          <div key="contact" className="app-page app-page-contact" style={{display: currpage==="contact" ? "block": "none"}}>
            <Contacts />
          </div>
          <div key="login" className="app-page app-page-login" style={{display: currpage==="login" ? "block": "none"}}>
            <Login tag={state.loginState} />
          </div>
        </div>
        <div className="App-foot">
          <PageChooser pages={pageItems} />
        </div>
      </div>
    );
  }
}

export default App;

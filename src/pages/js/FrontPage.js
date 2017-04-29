import React, { Component } from 'react';
import '../../App.css';

import OngoingDialog from '../../components/js/OngoingDialog';
import Contacts from '../../components/js/Contacts';
import Login from '../../components/js/Login';
import PersonnelInfo from '../../components/js/PersonnelInfo';
import PageChooser from '../../components/js/PageChooser';
import User from '../../components/js/User';

import MyAction from '../../state/action';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var state = this.props.state;
    var pageItems = [
      { icon: '/images/ic_chat_bubble_outline_black_36dp_1x.png', label: '聊天', page: 'ongoing_dialog' },
      { icon: '/images/ic_person_outline_black_36dp_1x.png', label: '联系人', page: 'contacts' },
      { icon: '/images/ic_cloud_outline_black_36dp_1x.png', label: '个人', page: 'user' }
    ];
    var pageState = state.pageState;
    var currpage = pageState.getState("front_page");
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chatroom DEMO</h2>
        </div>
        <div className="App-body">
          <div key="chat" className="app-page app-page-chat" style={{ display: currpage === "ongoing_dialog" ? "block" : "none" }}>
            <OngoingDialog users={state.users} dialogs={state.ongoingDialog} />
          </div>
          <div key="contact" className="app-page app-page-contact" style={{ display: currpage === "contacts" ? "block" : "none" }}>
            <Contacts userid={state.userid} users={state.users} />
          </div>
          <div key="login" className="app-page app-page-login" style={{ display: currpage === "user" ? "block" : "none" }}>
            <User tag={pageState.getState("user")} avatar={state.avatar} nickname={state.nickname} />
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

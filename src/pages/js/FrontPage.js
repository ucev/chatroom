import React from 'react';
import BasePage from './BasePage';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import '../../App.css';

import Contacts from '../../components/js/Contacts';
import OngoingDialog from '../../components/js/OngoingDialog';
import PageChooser from '../../components/js/PageChooser';
import PersonnelInfo from '../../components/js/PersonnelInfo';

import MyAction from '../../state/action';

class FrontPage extends BasePage {
  componentDidMount() {
    super.componentDidMount();
    MyAction.getUserInfo();
  }
  render() {
    if (!MyAction.userCheck()) {
      return <Redirect to="/login"/>;
    }
    var state = MyAction.getState();
    var match = this.props.match;
    var pageItems = [
      { icon: '/images/ic_chat_bubble_outline_black_36dp_1x.png', label: '聊天', page: 'chat', url: `${match.url}/chat` },
      { icon: '/images/ic_person_outline_black_36dp_1x.png', label: '联系人', page: 'contacts', url: `${match.url}/contacts` },
      { icon: '/images/ic_cloud_outline_black_36dp_1x.png', label: '个人', page: 'user', url: `${match.url}/user` }
    ];
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chatroom DEMO</h2>
        </div>
        <div className="App-body">
          <Switch>
            <Route path={`${match.url}/contacts`} component={Contacts} />
            <Route path={`${match.url}/user`} component={PersonnelInfo} />
            <Route path={`${match.url}/chat`} component={OngoingDialog}/>
            <Redirect to={`${match.url}/chat`}/>
          </Switch>
        </div>
        <div className="App-foot">
          <PageChooser pages={pageItems} />
        </div>
      </div>
    );
    /*
    return (
      <div className="App">
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
      </div>
    );
    */
  }
}

export default FrontPage;
